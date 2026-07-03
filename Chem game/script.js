document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.querySelector(".start-screen");
  const chapterScreen = document.getElementById("chapter-screen");
  const levelScreen = document.getElementById("level-screen");
  const gameScreen = document.getElementById("game-screen");
  const startButton = document.getElementById("start-button");
  const backToTitleButton = document.getElementById("back-to-title-button");
  const backToChaptersButton = document.getElementById("back-to-chapters-button");
  const backToLevelsButton = document.getElementById("back-to-levels-button");
  const chapterGrid = document.getElementById("chapter-grid");
  const levelGrid = document.getElementById("level-grid");
  const chapterTitle = document.getElementById("chapter-title");
  const mainChemical = document.getElementById("main-chemical");
  const targetChemical = document.getElementById("target-chemical");
  const reactionBox = document.getElementById("reaction-box");
  const reagentTray = document.getElementById("reagent-tray");
  const undoButton = document.getElementById("undo-button");
  const resetButton = document.getElementById("reset-button");
  const confirmButton = document.getElementById("confirm-button");
  const clearPopup = document.getElementById("clear-popup");
  const nextStageButton = document.getElementById("next-stage-button");
  const targetDisplay = document.querySelector(".target-display");
  const conditions = {heat: false};


  let currentChapter = 1;
  let currentLevel = null;
  let currentMolecule = null;
  let moleculeHistory = [];

  function showScreen(screen) {
    startScreen.style.display = "none";
    chapterScreen.style.display = "none";
    levelScreen.style.display = "none";
    gameScreen.style.display = "none";

    screen.style.display = "flex";
  }

  function getChapters() {
    const chapterNumbers = levels.map((level) => level.chapter);
    return [...new Set(chapterNumbers)];
  }

  function makeChapterButtons() {
    chapterGrid.innerHTML = "";

    getChapters().forEach((chapterNumber) => {
      const button = document.createElement("button");
      button.classList.add("chapter-button");
      button.textContent = `Chapter ${chapterNumber}`;

      button.addEventListener("click", () => {
        currentChapter = chapterNumber;
        makeLevelButtons(chapterNumber);
        showScreen(levelScreen);
      });

      chapterGrid.appendChild(button);
    });
  }

  function makeLevelButtons(chapterNumber) {
    levelGrid.innerHTML = "";
    chapterTitle.textContent = `Chapter ${chapterNumber}`;

    const chapterLevels = levels.filter((level) => level.chapter === chapterNumber);

    chapterLevels.forEach((level) => {
      const button = document.createElement("button");
      button.classList.add("level-button");
      button.textContent = level.number;

      button.addEventListener("click", () => {
        loadLevel(level.number);
      });

      levelGrid.appendChild(button);
    });
  }

  function renderMolecule(molecule, svgClass = "molecule-svg") {

    const atomPositions = {};
    const spacing = 100;
    const startX = 280 - ((molecule.atoms.length - 1) * spacing) / 2;

    const viewBox = "0 0 560 240";
    const scale = molecule.scale || 1;
    const offsetX = molecule.offsetX || 0;
    const offsetY = molecule.offsetY || 0;  
    const cx = 280;
    const cy = 120;

    molecule.atoms.forEach((atom, index) => {
      if (atom.x !== undefined && atom.y !== undefined) {
        atomPositions[atom.id] = {
          x: atom.x + offsetX,
          y: atom.y + offsetY
        };
      } else {
        atomPositions[atom.id] = {
          x: startX + index * spacing + offsetX,
          y: 100 + offsetY
        };
      }
    });

    let svg = `
      <svg class="${svgClass}" viewBox="${viewBox}">
        <g transform="translate(${cx}, ${cy}) scale(${scale}) translate(${-cx}, ${-cy})">
    `;

    function drawSubstituent(pos, angle, label, className, opacity = 1, bondOrder = 1) {

      const rad = Number(angle) * Math.PI / 180;

      const dx = Math.cos(rad);
      const dy = Math.sin(rad);

      const bondStart = 18;
      const bondEnd = 55;
      const textDistance = 75;

      const x1 = pos.x + dx * bondStart;
      const y1 = pos.y + dy * bondStart;

      const x2 = pos.x + dx * bondEnd;
      const y2 = pos.y + dy * bondEnd;

      const textX = pos.x + dx * textDistance;
      const textY = pos.y + dy * textDistance;
            
      const ox = -dy * 6;
      const oy = dx * 6;

      let bond = "";

      if (bondOrder === 2) {
        bond = `
          <line
            x1="${x1 + ox}" y1="${y1 + oy}"
            x2="${x2 + ox}" y2="${y2 + oy}"
            class="bond"
            opacity="${opacity}"
          />
          <line
            x1="${x1 - ox}" y1="${y1 - oy}"
            x2="${x2 - ox}" y2="${y2 - oy}"
            class="bond"
            opacity="${opacity}"
          />
        `;
      }
      else {
        bond = `
          <line
            x1="${x1}" y1="${y1}"
            x2="${x2}" y2="${y2}"
            class="bond"
            opacity="${opacity}"
          />
        `;
      }

      return `
        ${bond}
        <text
          x="${textX}"
          y="${textY}"
          class="atom ${className}"
          text-anchor="middle"
          dominant-baseline="middle"
          opacity="${opacity}"
        >${label}</text>
      `;
    }

    molecule.bonds.forEach((bond) => {

      const from = atomPositions[bond.from];
      const to = atomPositions[bond.to];

      const dx = to.x - from.x;
      const dy = to.y - from.y;

      const len = Math.sqrt(dx * dx + dy * dy);

      const ux = dx / len;
      const uy = dy / len;

      const pad = 20;

      const x1 = from.x + ux * pad;
      const y1 = from.y + uy * pad;

      const x2 = to.x - ux * pad;
      const y2 = to.y - uy * pad;

      const ox = -uy * 6;
      const oy = ux * 6;

      if (bond.order === 2) {
        svg += `
          <line x1="${x1 + ox}" y1="${y1 + oy}" x2="${x2 + ox}" y2="${y2 + oy}" class="bond" />
          <line x1="${x1 - ox}" y1="${y1 - oy}" x2="${x2 - ox}" y2="${y2 - oy}" class="bond" />
        `;
      }

      else if (bond.order === 3) {
        svg += `
          <line x1="${x1 + ox * 2}" y1="${y1 + oy * 2}" x2="${x2 + ox * 2}" y2="${y2 + oy * 2}" class="bond" />
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="bond" />
          <line x1="${x1 - ox * 2}" y1="${y1 - oy * 2}" x2="${x2 - ox * 2}" y2="${y2 - oy * 2}" class="bond" />
        `;
      }

      else {
        svg += `
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="bond" />
        `;
      }
    });

    molecule.atoms.forEach((atom) => {

      const pos = atomPositions[atom.id];

      svg += `
        <text x="${pos.x}" y="${pos.y + 10}" class="atom" text-anchor="middle">
          ${atom.element}
        </text>
      `;
      
      const hydrogenOpacity = molecule.hydrogenOpacity ?? 1;

      function drawGroup(
          positions,
          label,
          className,
          opacity = 1,
          bondOrder = 1
      ) {
          for (const angle of (positions || [])) {
              svg += drawSubstituent(
                  pos,
                  angle,
                  label,
                  className,
                  opacity,
                  bondOrder
              );
          }
      }

      drawGroup(atom.hydrogenPositions, "H", "hydrogen", hydrogenOpacity);
      drawGroup(atom.brominePositions, "Br", "bromine");
      drawGroup(atom.chlorinePositions, "Cl", "chlorine");
      drawGroup(atom.iodinePositions, "I", "iodine");
      drawGroup(atom.oxygenPositions, "O", "oxygen", 1, 2);
      drawGroup(atom.hydroxylPositions, "OH", "oxygen");
    });

    svg += `
        </g>
      </svg>
    `;

    return svg;
  }

  function makeReagentButtons(reagents) {
    reagentTray.innerHTML = "";

    reagents.forEach((reagentName) => {
      const button = document.createElement("button");

      button.classList.add("reagent");
      button.draggable = true;
      button.textContent = reagentName;

      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", reagentName);
      });

    reagentTray.appendChild(button);
  });
  }

  //Addition
  function getMarkovnikovCarbons(bond, molecule) {
    const carbon1 = molecule.atoms.find(
      atom => atom.id === bond.from
    );

    const carbon2 = molecule.atoms.find(
      atom => atom.id === bond.to
    );

    const sub1 = getCarbonSubstitution(
      carbon1,
      molecule
    );

    const sub2 = getCarbonSubstitution(
      carbon2,
      molecule
    );

    let hydrogenCarbon;
    let bromineCarbon;

    if (sub1 > sub2) {
      bromineCarbon = carbon1;
      hydrogenCarbon = carbon2;
    }
    else if (sub2 > sub1) {
      bromineCarbon = carbon2;
      hydrogenCarbon = carbon1;
    }
    else {

      const h1 = (carbon1.hydrogenPositions ?? []).length;
      const h2 = (carbon2.hydrogenPositions ?? []).length;

      hydrogenCarbon = h1 >= h2
        ? carbon1
        : carbon2;

      bromineCarbon =
        hydrogenCarbon === carbon1
          ? carbon2
          : carbon1;
    }

    return {
      hydrogenCarbon,
      bromineCarbon
    };
  }

  function getFreePosition(atom) {

    const used = [
      ...(atom.hydrogenPositions ?? []),
      ...(atom.brominePositions ?? []),
      ...(atom.chlorinePositions ?? []),
      ...(atom.iodinePositions ?? []),
      ...(atom.oxygenPositions ?? []),
      ...(atom.hydroxylPositions ?? [])
    ];

    const available = atom.angles.filter(
      angle => !used.includes(angle)
    );

    // If only one position is left, use it.
    if (available.length === 1) {
      return available[0];
    }

    // If this is the first substituent being added,
    // skip the centre angle and use the second one.
    if (used.length === 1 && atom.angles.length === 3) {
      return atom.angles[1];
    }

    // Otherwise use the first available.
    return available[0];
  }

  function addSubstituent(atom, arrayName) {

    atom[arrayName] ??= [];

    const arrays = [
      "hydrogenPositions",
      "brominePositions",
      "chlorinePositions",
      "iodinePositions",
      "oxygenPositions",
      "hydroxylPositions"
    ];

    const occupied = arrays.flatMap(name => atom[name] ?? []);

    if (atom.angles) {

      if (atom.angles.length === 3) {

        if (occupied.length === 0) {
          atom[arrayName].push(atom.angles[0]);
          return;
        }

        if (occupied.length === 1 && occupied[0] === atom.angles[0]) {

          const existingArray = arrays.find(name =>
            (atom[name] ?? []).includes(atom.angles[0])
          );

          atom[existingArray] = [atom.angles[1]];
          atom[arrayName].push(atom.angles[2]);
          return;
        }
      }

      if (atom.angles.length === 6) {

        if (occupied.length === 0) {
          atom[arrayName].push(atom.angles[0]);
          return;
        }

        if (occupied.length === 1 && occupied[0] === atom.angles[0]) {

          const existingArray = arrays.find(name =>
            (atom[name] ?? []).includes(atom.angles[0])
          );

          atom[existingArray] = [atom.angles[1]];
          atom[arrayName].push(atom.angles[2]);
          return;
        }

        if (occupied.length === 2) {

          const oldAngles = [atom.angles[1], atom.angles[2]];

          const existingArrays = arrays.filter(name =>
            (atom[name] ?? []).some(angle => oldAngles.includes(angle))
          );

          if (existingArrays.length === 2) {

            const angleToArray = {};

            existingArrays.forEach(name => {
              angleToArray[atom[name][0]] = name;
            });

            atom[angleToArray[atom.angles[1]]] = [atom.angles[4]];
            atom[angleToArray[atom.angles[2]]] = [atom.angles[5]];

            atom[arrayName].push(atom.angles[3]);

            return;
          }
        }
      }
    }

    atom[arrayName].push(getFreePosition(atom));
  }


  //Elimiation/Substitution
  function removeSubstituent(atom, arrayName) {

      atom[arrayName] ??= [];

      if (atom[arrayName].length > 0) {
          atom[arrayName].pop();
      }
  }

  function isUnsaturatedCarbon(atom, molecule) {

      return molecule.bonds.some(
          bond =>
              (bond.from === atom.id || bond.to === atom.id) &&
              bond.order > 1
      );

  }

  function findSaturatedHalide(molecule) {

      return (
          molecule.atoms.find(
              atom =>
                  atom.iodinePositions?.length &&
                  !isUnsaturatedCarbon(atom, molecule)
          ) ||

          molecule.atoms.find(
              atom =>
                  atom.brominePositions?.length &&
                  !isUnsaturatedCarbon(atom, molecule)
          ) ||

          molecule.atoms.find(
              atom =>
                  atom.chlorinePositions?.length &&
                  !isUnsaturatedCarbon(atom, molecule)
          ) ||

          null
      );

  }

  function findUnsaturatedHalide(molecule) {

      return (
          molecule.atoms.find(
              atom =>
                  atom.iodinePositions?.length &&
                  isUnsaturatedCarbon(atom, molecule)
          ) ||

          molecule.atoms.find(
              atom =>
                  atom.brominePositions?.length &&
                  isUnsaturatedCarbon(atom, molecule)
          ) ||

          molecule.atoms.find(
              atom =>
                  atom.chlorinePositions?.length &&
                  isUnsaturatedCarbon(atom, molecule)
          ) ||

          null
      );

  }

  function getCarbonSubstitution(atom, molecule) {
    return molecule.bonds.filter(
      bond => bond.from === atom.id || bond.to === atom.id
    ).length;
  }

  function findBestLeavingGroup(molecule) {

      return (
          molecule.atoms.find(
              atom =>
                  atom.iodinePositions?.length &&
                  !isUnsaturatedCarbon(atom, molecule)
          ) ||

          molecule.atoms.find(
              atom =>
                  atom.brominePositions?.length &&
                  !isUnsaturatedCarbon(atom, molecule)
          ) ||

          molecule.atoms.find(
              atom =>
                  atom.chlorinePositions?.length &&
                  !isUnsaturatedCarbon(atom, molecule)
          ) ||

          molecule.atoms.find(
              atom =>
                  atom.iodinePositions?.length
          ) ||

          molecule.atoms.find(
              atom =>
                  atom.brominePositions?.length
          ) ||

          molecule.atoms.find(
              atom =>
                  atom.chlorinePositions?.length
          ) ||

          null
      );

  }

  function halideCount(atom) {
      return (
          (atom.brominePositions?.length || 0) +
          (atom.chlorinePositions?.length || 0) +
          (atom.iodinePositions?.length || 0)
      );
  }
  

  //conditions
  function makeConditionButtons(chapter){

      conditionBar.innerHTML="";

      if(chapter < 2){
          conditionBar.style.display="none";
          return;
      }

      conditionBar.style.display="flex";

      addConditionButton("heat","Δ Heat");
  }

  function addConditionButton(key,label){

    const button=document.createElement("button");

    button.className="condition-button";
    button.textContent=label;

    if(conditions[key]){
        button.classList.add("active");
    }

    button.onclick=()=>{

        conditions[key]=!conditions[key];

        button.classList.toggle("active");

        updateConditions();
    };

    conditionBar.appendChild(button);
  }

  function updateConditions(){

      if(conditions.heat){
          gameScreen.classList.add("heat-mode");
      }
      else{
          gameScreen.classList.remove("heat-mode");
      }

  }

  //Molecule add
  function addHydrogen(atom) {
    addSubstituent(atom, "hydrogenPositions");
  }
  function addBromine(atom) {
    addSubstituent(atom, "brominePositions");
  }
  function addChlorine(atom) {
    addSubstituent(atom, "chlorinePositions");
  }
  function addIodine(atom) {
    addSubstituent(atom, "iodinePositions");
  }
  function addOxygen(atom) {
    addSubstituent(atom, "oxygenPositions");
  }
  function addHydroxyl(atom) {
    addSubstituent(atom, "hydroxylPositions");
  }
  function removeHydrogen(atom) {
      atom.hydrogenPositions.pop();
  }
  function removeHalide(atom) {

      if (atom.iodinePositions?.length) {
          atom.iodinePositions.pop();
          return;
      }

      if (atom.brominePositions?.length) {
          atom.brominePositions.pop();
          return;
      }

      if (atom.chlorinePositions?.length) {
          atom.chlorinePositions.pop();
          return;
      }

  }
  function removeBestHalide(atom) {

      if (atom.iodinePositions?.length) {
          removeIodine(atom);
          return;
      }

      if (atom.brominePositions?.length) {
          removeBromine(atom);
          return;
      }

      if (atom.chlorinePositions?.length) {
          removeChlorine(atom);
          return;
      }
  }
  function halideCount(atom) {
      return (
          (atom.iodinePositions?.length || 0) +
          (atom.brominePositions?.length || 0) +
          (atom.chlorinePositions?.length || 0)
      );
  }
  function removeBromine(atom) {
      atom.brominePositions.pop();
  }
  function removeChlorine(atom) {
      atom.chlorinePositions.pop();
  }
  function removeIodine(atom) {
      atom.iodinePositions.pop();
  }

  //Reagent Apply
  function applyHBr(molecule) {

    const bond =
      molecule.bonds.find(bond => bond.order === 2) ||
      molecule.bonds.find(bond => bond.order === 3);

    if (!bond) {
      return molecule;
    }

    console.log("Found bond:", bond);

    bond.order -= 1;

    console.log("After reducing:", bond.order);

    const {
      hydrogenCarbon,
      bromineCarbon
    } = getMarkovnikovCarbons(
      bond,
      molecule
    );

    addHydrogen(hydrogenCarbon);
    addBromine(bromineCarbon);

    return molecule;
  }
  
  function applyBr2(molecule) {

    const bond =
      molecule.bonds.find(bond => bond.order === 2) ||
      molecule.bonds.find(bond => bond.order === 3);

    if (!bond) {
      return molecule;
    }

    bond.order -= 1;

    const carbon1 = molecule.atoms.find(
      atom => atom.id === bond.from
    );

    const carbon2 = molecule.atoms.find(
      atom => atom.id === bond.to
    );

    addBromine(carbon1);
    addBromine(carbon2);

    return molecule;
  }

  function applyHCl(molecule) {

  const bond =
    molecule.bonds.find(bond => bond.order === 2) ||
    molecule.bonds.find(bond => bond.order === 3);

  if (!bond) {
    return molecule;
  }

  bond.order -= 1;

  const {
    hydrogenCarbon,
    bromineCarbon
  } = getMarkovnikovCarbons(
    bond,
    molecule
  );

  addHydrogen(hydrogenCarbon);
  addChlorine(bromineCarbon);

  return molecule;
  }

  function applyHI(molecule) {

    const bond =
      molecule.bonds.find(bond => bond.order === 2) ||
      molecule.bonds.find(bond => bond.order === 3);

    if (!bond) {
      return molecule;
    }

    bond.order -= 1;

    const {
      hydrogenCarbon,
      bromineCarbon
    } = getMarkovnikovCarbons(
      bond,
      molecule
    );

    addHydrogen(hydrogenCarbon);
    addIodine(bromineCarbon);

    return molecule;
  }

  function applyCl2(molecule) {

    const bond =
      molecule.bonds.find(bond => bond.order === 2) ||
      molecule.bonds.find(bond => bond.order === 3);

    if (!bond) {
      return molecule;
    }

    bond.order -= 1;

    const carbon1 = molecule.atoms.find(
      atom => atom.id === bond.from
    );

    const carbon2 = molecule.atoms.find(
      atom => atom.id === bond.to
    );

    addChlorine(carbon1);
    addChlorine(carbon2);

    return molecule;
  }

  function applyI2(molecule) {

    const bond =
      molecule.bonds.find(bond => bond.order === 2) ||
      molecule.bonds.find(bond => bond.order === 3);

    if (!bond) {
      return molecule;
    }

    bond.order -= 1;

    const carbon1 = molecule.atoms.find(
      atom => atom.id === bond.from
    );

    const carbon2 = molecule.atoms.find(
      atom => atom.id === bond.to
    );

    addIodine(carbon1);
    addIodine(carbon2);

    return molecule;
  }

  function applyH2O(molecule) {
    const bond =
      molecule.bonds.find(bond => bond.order === 2) ||
      molecule.bonds.find(bond => bond.order === 3);

    if (!bond) {
      return molecule;
    }

    const {
      hydrogenCarbon,
      bromineCarbon
    } = getMarkovnikovCarbons(
      bond,
      molecule
    );

    if (bond.order === 3) {

      bond.order = 1;

      addOxygen(bromineCarbon);

    }
    else {

      bond.order = 1;

      addHydrogen(hydrogenCarbon);
      addHydroxyl(bromineCarbon);

    }

    return molecule;
  }

  function applyBH3(molecule) {
    const bond =
      molecule.bonds.find(bond => bond.order === 2) ||
      molecule.bonds.find(bond => bond.order === 3);

    if (!bond) {
      return molecule;
    }

    const {
      hydrogenCarbon,
      bromineCarbon
    } = getMarkovnikovCarbons(
      bond,
      molecule
    );

    if (bond.order === 3) {

      bond.order = 1;

      addOxygen(hydrogenCarbon);

    }
    else {

      bond.order = 1;

      addHydrogen(bromineCarbon);
      addHydroxyl(hydrogenCarbon);

    }

    return molecule;
  }

  function applyH2(molecule) {

    const bond =
      molecule.bonds.find(bond => bond.order === 2) ||
      molecule.bonds.find(bond => bond.order === 3);

    if (!bond) {
      return molecule;
    }

    const carbon1 = molecule.atoms.find(
      atom => atom.id === bond.from
    );

    const carbon2 = molecule.atoms.find(
      atom => atom.id === bond.to
    );

    if (bond.order === 3) {

      bond.order = 1;
      addHydrogen(carbon1);
      addHydrogen(carbon2);
      addHydrogen(carbon1);
      addHydrogen(carbon2);
    }
    else {

      bond.order = 1;

      addHydrogen(carbon1);
      addHydrogen(carbon2);

    }

    return molecule;
  }

  function applyKOH(molecule) { 
    const atom = findSaturatedHalide(molecule);

    if (!atom) {
        return molecule;
    }

    removeHalide(atom);
    addHydroxyl(atom);

      return molecule;
  }

  function applyKOHHeat(molecule) {
    const carbon = findSaturatedHalide(molecule);

    if (!carbon) {
        return molecule;
    }

      const bond = molecule.bonds.find(
          bond =>
              (bond.from === carbon.id || bond.to === carbon.id) &&
              bond.order === 1
      );

      if (!bond) {
          return molecule;
      }

      const adjacentCarbon = molecule.atoms.find(
          atom =>
              atom.id === (
                  bond.from === carbon.id
                      ? bond.to
                      : bond.from
              )
      );

      if (!adjacentCarbon) {
          return molecule;
      }

      if (!adjacentCarbon.hydrogenPositions?.length) {
          return molecule;
      }

      bond.order++;

      removeHalide(carbon);
      removeHydrogen(adjacentCarbon);

      return molecule;
  }
  function applyNaNH2(molecule) {

      const carbon = findBestLeavingGroup(molecule);

      if (!carbon) {
          return molecule;
      }

      let bond = molecule.bonds.find(bond => {

          if (bond.order !== 1) return false;

          if (bond.from !== carbon.id && bond.to !== carbon.id)
              return false;

          const otherId =
              bond.from === carbon.id
                  ? bond.to
                  : bond.from;

          const other = molecule.atoms.find(
              atom => atom.id === otherId
          );

          return (
              other.brominePositions?.length ||
              other.chlorinePositions?.length ||
              other.iodinePositions?.length
          );

      });

      if (!bond) {

          bond = molecule.bonds.find(
              bond =>
                  (bond.from === carbon.id || bond.to === carbon.id) &&
                  bond.order === 1
          );

      }

      if (!bond) {
          return molecule;
      }

      const adjacentCarbon = molecule.atoms.find(
          atom =>
              atom.id === (
                  bond.from === carbon.id
                      ? bond.to
                      : bond.from
              )
      );

      if (!adjacentCarbon) {
          return molecule;
      }

      const totalHalides =
          halideCount(carbon) +
          halideCount(adjacentCarbon);
      if (totalHalides > 2) {
          return molecule;
      }

      const adjacentHasHalide =
          adjacentCarbon.brominePositions?.length ||
          adjacentCarbon.chlorinePositions?.length ||
          adjacentCarbon.iodinePositions?.length;

      if (adjacentHasHalide) {

          removeHalide(carbon);
          removeHalide(adjacentCarbon);

          removeHydrogen(carbon);
          removeHydrogen(adjacentCarbon);

          bond.order = 3;

          return molecule;
      }

      if (!adjacentCarbon.hydrogenPositions?.length) {
          return molecule;
      }

      removeHalide(carbon);
      removeHydrogen(adjacentCarbon);

      bond.order = 2;

      return molecule;
  }



  let targetMolecule = null;
  function generateTargetMolecule(level) {
    let molecule = structuredClone(
      molecules[level.startingChemical]
    );

    for (const reagent of level.targetReagents) {

      if (reagent === "HBr") {
        applyHBr(molecule);
      }

      if (reagent === "Br2") {
        applyBr2(molecule);
      }
      if (reagent === "HCl") {
        applyHCl(molecule);
      }

      if (reagent === "Cl2") {
        applyCl2(molecule);
      }

      if (reagent === "HI") {
        applyHI(molecule);
      }

      if (reagent === "I2") {
        applyI2(molecule);
      }

      if (reagent === "H2O") {
        applyH2O(molecule);
      }

      if (reagent === "BH3") {
        applyBH3(molecule);
      }

      if (reagent === "H2") {
        applyH2(molecule);
      }

      if (reagent === "KOH") {
        applyKOH(molecule);
      }

      if (reagent === "KOHHeat") {
        applyKOHHeat(molecule);
      }

      if (reagent === "NaNH2") {
        applyNaNH2(molecule);
      }
    }

    return molecule;
  }

  function loadLevel(levelNumber) {
      const level = levels.find((level) => level.number === levelNumber);
      currentLevel = level;

      currentMolecule = structuredClone(
        molecules[level.startingChemical]
      );

      moleculeHistory = [];

      document.getElementById("level-title").textContent = level.title;

      mainChemical.innerHTML = renderMolecule(currentMolecule);

      targetMolecule = generateTargetMolecule(level);

      targetChemical.innerHTML = renderMolecule(
        targetMolecule,
        "target-molecule-svg"
      );

      const targetAtomCount = targetMolecule.atoms.length;
      targetDisplay.classList.remove(
        "target-small",
        "target-medium",
        "target-large"
      );

      if (targetAtomCount <= 2) {
        targetDisplay.classList.add("target-small");
      }
      else if (targetAtomCount === 3) {
        targetDisplay.classList.add("target-medium");
      }
      else {
        targetDisplay.classList.add("target-large");
      }

      makeReagentButtons(level.reagents);

      conditions.heat = false;
      updateConditions();
      makeConditionButtons(level.chapter);

      clearPopup.classList.remove("active");

      showScreen(gameScreen);
  }

  function count(array) {
    return array?.length || 0;
  }

  function moleculesAreEqual(a, b) {

    if (a.atoms.length !== b.atoms.length) {
      return false;
    }

    if (a.bonds.length !== b.bonds.length) {
      return false;
    }

    for (let i = 0; i < a.atoms.length; i++) {

      const atomA = a.atoms[i];
      const atomB = b.atoms[i];

      if (count(atomA.hydrogenPositions) !== count(atomB.hydrogenPositions)) {
        return false;
      }

      if (count(atomA.brominePositions) !== count(atomB.brominePositions)) {
        return false;
      }

      if (count(atomA.chlorinePositions) !== count(atomB.chlorinePositions)) {
        return false;
      }

      if (count(atomA.iodinePositions) !== count(atomB.iodinePositions)) {
        return false;
      }

      if (count(atomA.oxygenPositions) !== count(atomB.oxygenPositions)) {
        return false;
      }

      if (count(atomA.hydroxylPositions) !== count(atomB.hydroxylPositions)) {
        return false;
      }
    }

    for (let i = 0; i < a.bonds.length; i++) {

      const bondA = a.bonds[i];
      const bondB = b.bonds[i];

      if (bondA.order !== bondB.order) {
        return false;
      }
    }

    return true;
  }

  startButton.addEventListener("click", () => {
    showScreen(chapterScreen);
  });

  backToTitleButton.addEventListener("click", () => {
    showScreen(startScreen);
  });

  backToChaptersButton.addEventListener("click", () => {
    showScreen(chapterScreen);
  });

  backToLevelsButton.addEventListener("click", () => {
    makeLevelButtons(currentChapter);
    showScreen(levelScreen);
  });

  undoButton.addEventListener("click", () => {
    if (moleculeHistory.length === 0) {
      return;
    }

    currentMolecule = moleculeHistory.pop();
      mainChemical.innerHTML = renderMolecule(currentMolecule);
  });

  resetButton.addEventListener("click", () => {
    if (!currentLevel) {
      return;}
    currentMolecule = structuredClone(
      molecules[currentLevel.startingChemical]);
    moleculeHistory = [];
    mainChemical.innerHTML = renderMolecule(currentMolecule);
  });

  confirmButton.addEventListener("click", () => {
    if (!currentLevel) {
      return;
    }

    if (moleculesAreEqual(currentMolecule, targetMolecule)) {
      clearPopup.classList.add("active");
    }
  });

  nextStageButton.addEventListener("click", () => {
    if (!currentLevel) {
      return;
    }

    const nextLevel = levels.find((level) => level.number === currentLevel.number + 1);

    clearPopup.classList.remove("active");

    if (nextLevel) {
      currentChapter = nextLevel.chapter;
      loadLevel(nextLevel.number);
    } else {
      makeLevelButtons(currentChapter);
      showScreen(levelScreen);
    }
  });

  reactionBox.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  reactionBox.addEventListener("drop", (event) => {
      event.preventDefault();

      const reagentName = event.dataTransfer.getData("text/plain");

      if (reagentName === "HBr") {
        moleculeHistory.push(
          structuredClone(currentMolecule)
        );

        currentMolecule = applyHBr(
          structuredClone(currentMolecule)
        );

        

        mainChemical.innerHTML =
          renderMolecule(currentMolecule);
      }

      if (reagentName === "Br2") {
        moleculeHistory.push(
          structuredClone(currentMolecule)
        );

        currentMolecule = applyBr2(
          structuredClone(currentMolecule)
        );

        mainChemical.innerHTML =
          renderMolecule(currentMolecule);
      }

      if (reagentName === "HCl") {
        moleculeHistory.push(
          structuredClone(currentMolecule)
        );

        currentMolecule = applyHCl(
          structuredClone(currentMolecule)
        );

        mainChemical.innerHTML =
          renderMolecule(currentMolecule);
      }

      if (reagentName === "Cl2") {
        moleculeHistory.push(
          structuredClone(currentMolecule)
        );

        currentMolecule = applyCl2(
          structuredClone(currentMolecule)
        );

        mainChemical.innerHTML =
          renderMolecule(currentMolecule);
      }

      if (reagentName === "HI") {
        moleculeHistory.push(
          structuredClone(currentMolecule)
        );

        currentMolecule = applyHI(
          structuredClone(currentMolecule)
        );

        mainChemical.innerHTML =
          renderMolecule(currentMolecule);
      }

      if (reagentName === "I2") {
        moleculeHistory.push(
          structuredClone(currentMolecule)
        );

        currentMolecule = applyI2(
          structuredClone(currentMolecule)
        );

        mainChemical.innerHTML =
          renderMolecule(currentMolecule);
      }

      if (reagentName === "H2O") {
      moleculeHistory.push(
        structuredClone(currentMolecule)
      );

      currentMolecule = applyH2O(
        structuredClone(currentMolecule)
      );

      mainChemical.innerHTML =
        renderMolecule(currentMolecule);
      }

      if (reagentName === "BH3") {
      moleculeHistory.push(
        structuredClone(currentMolecule)
      );

      currentMolecule = applyBH3(
        structuredClone(currentMolecule)
      );

      mainChemical.innerHTML =
        renderMolecule(currentMolecule);
      }

      if (reagentName === "H2") {
      moleculeHistory.push(
        structuredClone(currentMolecule)
      );

      currentMolecule = applyH2(
        structuredClone(currentMolecule)
      );

      mainChemical.innerHTML =
        renderMolecule(currentMolecule);
      }

      if (reagentName === "KOH") {

          moleculeHistory.push(structuredClone(currentMolecule));

          if (conditions.heat) {
              currentMolecule = applyKOHHeat(structuredClone(currentMolecule));
          } else {
              currentMolecule = applyKOH(structuredClone(currentMolecule));
          }

          mainChemical.innerHTML = renderMolecule(currentMolecule);
      }

      if (reagentName === "NaNH2") {
      moleculeHistory.push(
        structuredClone(currentMolecule)
      );

      currentMolecule = applyNaNH2(
        structuredClone(currentMolecule)
      );

      mainChemical.innerHTML =
        renderMolecule(currentMolecule);
      }
      
  });


  makeChapterButtons();
});
