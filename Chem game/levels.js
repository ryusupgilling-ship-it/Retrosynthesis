const molecules = {
  ethene: {//C=C
    atoms: [
      {
        id:1,
        element:"C",
        angles:[180,270,90],
        hydrogenPositions:[180,90]
      },
      {
        id:2,
        element:"C",
        angles:[0,270,90],
        hydrogenPositions:[0,90]
      }
    ],
    bonds:[
      {from:1,to:2,order:2}
    ]
  },

  propene:{//C-C=C
    atoms:[
      {
        id:1,
        element:"C",
        angles:[180,270,90],
        hydrogenPositions:[180,270,90]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[270]
      },
      {
        id:3,
        element:"C",
        angles:[0,270,90],
        hydrogenPositions:[0,270]
      }
    ],
    bonds:[
      {from:1,to:2,order:1},
      {from:2,to:3,order:2}
    ]
  },

  propyne:{//C-C≡C
    atoms:[
      {
        id:1,
        element:"C",
        angles:[180,270,90],
        hydrogenPositions:[180,270,90]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:3,
        element:"C",
        angles:[270,90,0],
        hydrogenPositions:[0]
      }
    ],
    bonds:[
      {from:1,to:2,order:1},
      {from:2,to:3,order:3}
    ]
  },

  butenyne:{//C=C-C≡C
    atoms:[
      {
        id:1,
        element:"C",
        angles:[180,270,90],
        hydrogenPositions:[180,270]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[90]
      },
      {
        id:3,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:4,
        element:"C",
        angles:[270,90,0],
        hydrogenPositions:[0]
      }
    ],
    bonds:[
      {from:1,to:2,order:2},
      {from:2,to:3,order:1},
      {from:3,to:4,order:3}
    ]
  },

  butenyne2:{//C≡C-C=C
    atoms:[
      {
        id:1,
        element:"C",
        angles:[270,90,180],
        hydrogenPositions:[180]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:3,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[90]
      },
      {
        id:4,
        element:"C",
        angles:[0,270,90],
        hydrogenPositions:[0,270]
      }
    ],
    bonds:[
      {from:1,to:2,order:3},
      {from:2,to:3,order:1},
      {from:3,to:4,order:2}
    ]
  },

  butediyne:{//C≡C-C≡C
    atoms:[
      {
        id:1,
        element:"C",
        angles:[270,90,180],
        hydrogenPositions:[180]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:3,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:4,
        element:"C",
        angles:[270, 90, 0],
        hydrogenPositions:[0]
      }
    ],
    bonds:[
      {from:1,to:2,order:3},
      {from:2,to:3,order:1},
      {from:3,to:4,order:3}
    ]
  },

  pentdieneyne:{//C≡C-C=C=C
    scale:0.9,
    hydrogenOpacity:0,
    atoms:[
      {
        id:1,
        element:"C",
        angles:[270,90,180],
        hydrogenPositions:[180]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:3,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[270]
      },
      {
        id:4,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:5,
        element:"C",
        angles:[270,90,0],
        hydrogenPositions:[0,270]
      }
    ],
    bonds:[
      {from:1,to:2,order:3},
      {from:2,to:3,order:1},
      {from:3,to:4,order:2},
      {from:4,to:5,order:2}
    ]
  },

  pentdieneyne2:{//C≡C-C=C=C
    scale:0.9,
    atoms:[
      {
        id:1,
        element:"C",
        angles:[270,90,180],
        hydrogenPositions:[180]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:3,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[270]
      },
      {
        id:4,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:5,
        element:"C",
        angles:[270,90,0],
        hydrogenPositions:[0,270]
      }
    ],
    bonds:[
      {from:1,to:2,order:3},
      {from:2,to:3,order:1},
      {from:3,to:4,order:2},
      {from:4,to:5,order:2}
    ]
  },

  pentdieneyne3:{//C=C=C-C≡C
    scale:0.9,
    atoms:[
      {
        id:1,
        element:"C",
        angles:[270,90,180],
        hydrogenPositions:[180,270]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:3,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[270]
      },
      {
        id:4,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[]
      },
      {
        id:5,
        element:"C",
        angles:[0,60,300],
        hydrogenPositions:[0]
      }
    ],
    bonds:[
      {from:2,to:3,order:2},
      {from:1,to:2,order:2},
      {from:3,to:4,order:1},
      {from:4,to:5,order:3}
    ]
  },

  heptane:{//hexagon + ethyl
    scale:0.7,
    hydrogenOpacity:0.1,
    offsetX:-100,
    offsetY:-25,
    atoms:[
      {id:1,
        element:"C",x:220,y:120,
        angles:[150,90,210],
        hydrogenPositions:[150]},
      {id:2,
        element:"C",x:280,y:80,
        angles:[270,240,300],
        hydrogenPositions:[]},
      {id:3,
        element:"C",x:340,y:120,
        angles:[270],
        hydrogenPositions:[270]},
      {id:4,
        element:"C",x:400,y:80,
        angles:[270,240,300],
        hydrogenPositions:[270]},
      {id:5,
        element:"C",x:460,y:120,
        angles:[90,120,60],
        hydrogenPositions:[90]},  
      {id:6,
        element:"C",x:520,y:80,
        angles:[75],
        hydrogenPositions:[]},
      {id:7,
        element:"C",x:580,y:120,
        angles:[30,90,330],
        hydrogenPositions:[90,330]},
      {id:8,
        element:"C",x:340,y:200,
        angles:[30,150],
        hydrogenPositions:[]},
      {id:9,
        element:"C",x:340,y:280,
        angles:[90,150,30],
        hydrogenPositions:[90]},
      {id:10,
        element:"C",x:520,y:0,
        angles:[270,210,330],
        hydrogenPositions:[270,210,330]}
      
    ],
    bonds:[
      {from:6,to:7,order:2},
      {from:4,to:5,order:2},
      {from:1,to:2,order:3},
      {from:2,to:3,order:1},
      {from:3,to:4,order:1},
      {from:5,to:6,order:1},
      {from:3,to:8,order:1},
      {from:8,to:9,order:3},
      {from:6,to:10,order:1}
    ]
  },

  cyclobutane:{//square C=C-C-C-
    scale:0.8,
    atoms:[
      {
        id:1,
        element:"C",
        x:230,
        y:80,
        angles:[180,270],
        hydrogenPositions:[180]
      },
      {
        id:2,
        element:"C",
        x:330,
        y:80,
        angles:[0,270],
        hydrogenPositions:[0]
      },
      {
        id:3,
        element:"C",
        x:330,
        y:160,
        angles:[0,90],
        hydrogenPositions:[0,90]
      },
      {
        id:4,
        element:"C",
        x:230,
        y:160,
        angles:[180,90],
        hydrogenPositions:[180,90]
      }
    ],
    bonds:[
      {from:1,to:2,order:2},
      {from:2,to:3,order:1},
      {from:3,to:4,order:1},
      {from:4,to:1,order:1}
    ]
  },

  cyclohexane:{//hexagon C-C-C-C-C-C-
    scale:0.6,
    offsetY:-50,
    hydrogenOpacity:0.5,
    atoms:[
      {id:1,
        element:"C",x:220,y:120,
        angles:[180,240],
        hydrogenPositions:[180,240]},
      {id:2,
        element:"C",x:280,y:80,
        angles:[240,300],
        hydrogenPositions:[240,300]},
      {id:3,
        element:"C",x:340,y:120,
        angles:[300,0],
        hydrogenPositions:[300,0]},
      {id:4,
        element:"C",x:340,y:200,
        angles:[0,60],
        hydrogenPositions:[0,60]},
      {id:5,
        element:"C",x:280,y:240,
        angles:[60,120],
        hydrogenPositions:[60,120]},
      {id:6,
        element:"C",x:220,y:200,
        angles:[120,180],
        hydrogenPositions:[120,180]}
    ],
    bonds:[
      {from:1,to:2,order:1},
      {from:2,to:3,order:1},
      {from:3,to:4,order:1},
      {from:4,to:5,order:1},
      {from:5,to:6,order:1},
      {from:6,to:1,order:1}
    ]
  },

  cyclohexadiyne:{//hexa C-C=C-C=C-C-
    scale:0.6,
    offsetY:-50,
    hydrogenOpacity:0.5,
    atoms:[
      {id:1,
        element:"C",x:220,y:120,
        angles:[180,240],
        hydrogenPositions:[180,240]},
      {id:2,
        element:"C",x:280,y:80,
        angles:[240,300],
        hydrogenPositions:[240,300]},
      {id:3,
        element:"C",x:340,y:120,
        angles:[330,300,0],
        hydrogenPositions:[330]},
      {id:4,
        element:"C",x:340,y:200,
        angles:[30,60,0],
        hydrogenPositions:[30]},
      {id:5,
        element:"C",x:280,y:240,
        angles:[90,60,120],
        hydrogenPositions:[90]},
      {id:6,
        element:"C",x:220,y:200,
        angles:[150,180,120],
        hydrogenPositions:[150]}
    ],
    bonds:[
      {from:1,to:2,order:1},
      {from:2,to:3,order:1},
      {from:3,to:4,order:2},
      {from:4,to:5,order:1},
      {from:5,to:6,order:2},
      {from:6,to:1,order:1}
    ]
  },

  etcyclohexane:{//hexagon + ethyl
    scale:0.7,
    offsetY:-50,
    hydrogenOpacity:0.1,
    atoms:[
      {id:1,
        element:"C",x:220,y:120,
        angles:[180,240],
        hydrogenPositions:[180,240]},
      {id:2,
        element:"C",x:280,y:80,
        angles:[240,300],
        hydrogenPositions:[240,300]},
      {id:3,
        element:"C",x:340,y:120,
        angles:[15],
        hydrogenPositions:[]},
      {id:4,
        element:"C",x:340,y:200,
        angles:[0,60],
        hydrogenPositions:[0,60]},
      {id:5,
        element:"C",x:280,y:240,
        angles:[90,60,120],
        hydrogenPositions:[]},
      {id:6,
        element:"C",x:220,y:200,
        angles:[150,120,180],
        hydrogenPositions:[]},
      {id:7,
        element:"C",x:400,y:80,
        angles:[240,270,300],
        hydrogenPositions:[270]},
      {id:8,
        element:"C",x:460,y:120,
        angles:[30,90,330],
        hydrogenPositions:[30,90,330]}
    ],
    bonds:[
      {from:3,to:7,order:2},
      {from:1,to:2,order:1},
      {from:2,to:3,order:1},
      {from:3,to:4,order:1},
      {from:4,to:5,order:1},
      {from:5,to:6,order:3},
      {from:6,to:1,order:1},
      {from:7,to:8,order:1}
    ]
  },

  heptcyclohexane:{//hexagon+heptane
    scale:0.6,
    offsetY:-50,
    hydrogenOpacity:0,
    atoms:[
      {id:1,
        element:"C",x:220,y:120,
        angles:[270],
        hydrogenPositions:[]},
      {id:2,
        element:"C",x:280,y:80,
        angles:[270,240,300],
        hydrogenPositions:[270]},
      {id:3,
        element:"C",x:340,y:120,
        angles:[270],
        hydrogenPositions:[270]},
      {id:4,
        element:"C",x:400,y:80,
        angles:[270,240,300],
        hydrogenPositions:[]},
      {id:5,
        element:"C",x:460,y:120,
        angles:[90,120,60],
        hydrogenPositions:[]},  
      {id:6,
        element:"C",x:520,y:80,
        angles:[75],
        hydrogenPositions:[]},
      {id:7,
        element:"C",x:580,y:120,
        angles:[30,90,330],
        hydrogenPositions:[30,90,330]},
      {id:8,
        element:"C",x:340,y:200,
        angles:[30,0,60],
        hydrogenPositions:[30]},
      {id:9,
        element:"C",x:280,y:240,
        angles:[90,120,60],
        hydrogenPositions:[90]},
      {id:10,
        element:"C",x:520,y:0,
        angles:[270,330,210],
        hydrogenPositions:[330,210]},
      {id:11,
        element:"C",x:100,y:120,
        angles:[270],
        hydrogenPositions:[270]},
      {id:12,
        element:"C",x:160,y:80,
        angles:[240,300],
        hydrogenPositions:[240,300]},
      {id:14,
        element:"C",x:220,y:200,
        angles:[90],
        hydrogenPositions:[]},
      {id:15,
        element:"C",x:160,y:240,
        angles:[90,60,120],
        hydrogenPositions:[90]},
      {id:16,
        element:"C",x:100,y:200,
        angles:[120,180],
        hydrogenPositions:[120,180]},
      {id:21,
        element:"C",x:40,y:80,
        angles:[270,240,300],
        hydrogenPositions:[]},
      {id:22,
        element:"C",x:-20,y:120,
        angles:[150,90,210],
        hydrogenPositions:[150]},
      
    ],
    bonds:[
      {from:14,to:15,order:2},
      {from:1,to:2,order:2},
      {from:6,to:10,order:2},
      {from:8,to:9,order:2},
      {from:5,to:4,order:3}, 
      {from:21,to:22,order:3},
  
      {from:6,to:7,order:1},
      {from:2,to:3,order:1},
      {from:3,to:4,order:1},
      {from:5,to:6,order:1},
      {from:3,to:8,order:1},
      {from:11,to:12,order:1},
      {from:12,to:1,order:1},
      {from:1,to:14,order:1},
      {from:15,to:16,order:1},
      {from:16,to:11,order:1},
      {from:9,to:14,order:1},
      {from:21,to:11,order:1},
    ]
  },



  //Chapter 2
  chloroethane: {//C-C(Cl)
    atoms: [
      {
        id:1,
        element:"C",
        angles:[180,270,90],
        hydrogenPositions:[180,90,270]
      },
      {
        id:2,
        element:"C",
        angles:[0,270,90],
        hydrogenPositions:[0,90],
        chlorinePositions:[270]
      }
    ],
    bonds:[
      {from:1,to:2,order:1}
    ]
  },
  chloropropane:{//C-C-C(Cl)
    atoms:[
      {
        id:1,
        element:"C",
        angles:[180,270,90],
        hydrogenPositions:[180,270,90]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[90,270],
      },
      {
        id:3,
        element:"C",
        angles:[270,90,0],
        hydrogenPositions:[0,90],
        chlorinePositions:[270]
      }
    ],
    bonds:[
      {from:1,to:2,order:1},
      {from:2,to:3,order:1}
    ]
  },
  dibromopropane:{//C-C(Br)-C(Br)
    atoms:[
      {
        id:1,
        element:"C",
        angles:[180,270,90],
        hydrogenPositions:[180,270,90]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[90],
        brominePositions:[270],
      },
      {
        id:3,
        element:"C",
        angles:[0,270,90],
        hydrogenPositions:[0,90],
        brominePositions:[270]
      }
    ],
    bonds:[
      {from:1,to:2,order:1},
      {from:2,to:3,order:1}
    ]
  },
  dibromobutane:{//C-C(Br)-C(Br)-C
    atoms:[
      {
        id:1,
        element:"C",
        angles:[180,270,90],
        hydrogenPositions:[180,270,90]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[90],
        brominePositions:[270]
      },
      {
        id:3,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[270],
        brominePositions:[90]
      },
      {
        id:4,
        element:"C",
        angles:[270,90,0],
        hydrogenPositions:[270,90,0]
      }
    ],
    bonds:[
      {from:1,to:2,order:1},
      {from:2,to:3,order:1},
      {from:3,to:4,order:1}
    ]
  },
  dichlorobutane:{//C-C(Br)-C(Br)-C
    atoms:[
      {
        id:1,
        element:"C",
        angles:[180,270,90],
        hydrogenPositions:[180,270,90]
      },
      {
        id:2,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[90],
        chlorinePositions:[270]
      },
      {
        id:3,
        element:"C",
        angles:[270,90],
        hydrogenPositions:[270],
        chlorinePositions:[90]
      },
      {
        id:4,
        element:"C",
        angles:[270,90,0],
        hydrogenPositions:[270,90,0]
      }
    ],
    bonds:[
      {from:1,to:2,order:1},
      {from:2,to:3,order:1},
      {from:3,to:4,order:1}
    ]
  },
};

const levels = [
  { number: 1,
  chapter: 1,
  title: "Level 1",
  startingChemical: "ethene",
  targetReagents: ["HBr"],
  reagents: ["HBr"]
  },

  { number: 2,
  chapter: 1,
  title: "Level 2",
  startingChemical: "propene",
  targetReagents: ["HBr", "HBr"],
  reagents: ["HBr"]
  },

  { number: 3,
  chapter: 1,
  title: "Level 3",
  startingChemical: "propyne",
  targetReagents: ["HBr", "HBr"],
  reagents: ["HBr"]
  },

  { number: 4,
    chapter: 1,
    title: "Level 4",
    startingChemical: "butediyne",
    targetReagents: ["HBr", "HBr", "HBr"],
    reagents: ["HBr"]
  },

  { number: 5,
    chapter: 1,
    title: "Level 5",
    startingChemical: "etcyclohexane",
    targetReagents: ["HBr", "HBr", "HBr"],
    reagents: ["HBr"]
  },

  { number: 6,
    chapter: 1,
    title: "Level 6",
    startingChemical: "ethene",
    targetReagents: ["Br2"],
    reagents: ["HBr","Br2"]
  },

  { number: 7,
    chapter: 1,
    title: "Level 7",
    startingChemical: "butenyne",
    targetReagents: ["Br2", "HBr"],
    reagents: ["HBr","Br2"]
  },

  { number: 8, 
    chapter: 1,
    title: "Level 8",
    startingChemical: "butediyne",
    targetReagents: ["Cl2", "HCl", "Cl2"],
    reagents: ["HCl","Cl2"]
  },

  { number: 9, 
    chapter: 1,
    title: "Level 9",
    startingChemical: "butenyne2",
    targetReagents: ["HBr", "HI", "I2"],
    reagents: ["HBr", "Br2","HI", "I2"]
  },

  { number: 10, 
    chapter: 1,
    title: "Level 10",
    startingChemical: "pentdieneyne",
    targetReagents: ["I2", "HBr", "Cl2", "HCl"],
    reagents: ["HBr","Br2","HCl","Cl2","HI","I2"]
  },
  
  { number: 11, 
    chapter: 1,
    title: "Level 11",
    startingChemical: "butenyne2",
    targetReagents: ["H2O", "H2O"],
    reagents: ["H2O"]
  },

  { number: 12, 
    chapter: 1,
    title: "Level 12",
    startingChemical: "pentdieneyne2",
    targetReagents: ["Br2","H2","Br2","H2"],
    reagents: ["HBr", "Br2","H2"]
  },

  { number: 13, 
    chapter: 1,
    title: "Level 13",
    startingChemical: "heptane",
    targetReagents: ["HCl","H2","Cl2","H2O","H2"],
    reagents: ["HCl","Cl2","H2O","H2"]
  },

  { number: 14, 
    chapter: 1,
    title: "Level 14",
    startingChemical: "heptane",
    targetReagents: ["H2O","HCl","H2O","HCl","HCl"],
    reagents: ["HCl","Cl2","H2O","H2"]
  },

  { number: 15, 
    chapter: 1,
    title: "Level 15",
    startingChemical: "heptcyclohexane",
    targetReagents: ["HBr", "H2", "HCl","Cl2","H2O","H2"],
    reagents: ["HBr", "Br2", "HCl", "Cl2","H2O","H2"]
  },

  { number: 16, 
    chapter: 1,
    title: "Level 16",
    startingChemical: "pentdieneyne3",
    targetReagents: ["H2O","BH3","BH3"],
    reagents: ["H2O","BH3"]
  },


  //Chapter 2
  { number: 21, 
    chapter: 2,
    title: "Level 21",
    startingChemical: "dibromobutane",
    targetReagents: ["KOH","KOHHeat"],
    reagents: ["KOH"]
  },
  { number: 22, 
    chapter: 2,
    title: "Level 22",
    startingChemical: "chloroethane",
    targetReagents: ["KOHHeat","Br2"],
    reagents: ["KOH","Br2"]
  },
  { number: 23, 
    chapter: 2,
    title: "Level 23",
    startingChemical: "dichlorobutane",
    targetReagents: ["KOHHeat","Br2","KOH"],
    reagents: ["KOH","HBr","Br2"]
  },
  { number: 24, 
    chapter: 2,
    title: "Level 24",
    startingChemical: "dichlorobutane",
    targetReagents: ["KOH","KOHHeat","Br2","KOH"],
    reagents: ["KOH","HBr","Br2"]
  },
  { number: 25, 
    chapter: 2,
    title: "Level 25",
    startingChemical: "pentdieneyne",
    targetReagents: ["HBr","HBr","H2O","KOH","KOHHeat"],
    reagents: ["KOH","H2O","HBr","Br2"]
  },
  { number: 26, 
    chapter: 2,
    title: "Level 26",
    startingChemical: "dibromopropane",
    targetReagents: ["NaNH2","HBr"],
    reagents: ["KOH","NaNH2","HBr","Br2"]
  },
  { number: 27, 
    chapter: 2,
    title: "Level 27",
    startingChemical: "chloropropane",
    targetReagents: ["KOHHeat","Cl2","NaNH2"],
    reagents: ["KOH","NaNH2","HCl","Cl2"]
  },
  { number: 28, 
    chapter: 2,
    title: "Level 28",
    startingChemical: "dibromopropane",
    targetReagents: ["KOHHeat","H2","NaNH2"],
    reagents: ["KOH","NaNH2","HBr","Br2","H2"]
  },
  { number: 29, 
    chapter: 2,
    title: "Level 29",
    startingChemical: "dibromopropane",
    targetReagents: ["KOHHeat","H2","NaNH2"],
    reagents: ["KOH","NaNH2","HBr","Br2","H2"]
  },
  { number: 30, 
    chapter: 2,
    title: "Level 30",
    startingChemical: "heptane",
    targetReagents: ["H2O","Br2","NaNH2","BH3","Br2","H2","H2","H2O","H2O"],
    reagents: ["KOH","NaNH2","H2O","BH3","Br2","H2"]
  },
];
