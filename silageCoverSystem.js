'use strict';

// TODO correct the variables
const tarpSizeA = [13, 22];
const tarpSizeB = [16, 19];
const pvcWidth1 = `${tarpSizeA[0]} x ${tarpSizeA[1]}`;
const pvcWidth2 = `${tarpSizeB[0]} x ${tarpSizeB[1]}`;
const evohOption1 = [16, 60]; // [width, leangth]
const evohOption2 = [22, 60]; // [width, leangth];
const rollPipeLength = 3;
const waterHoseLeangth = 10;
const btnOK = document.querySelector('.btn-ok');
const pvcTypeEL = document.getElementById('pvc--type');
const pvcAmountEL = document.getElementById('pvc--amount');
const evohFilmEL = document.getElementById('evoh--film');
const evohAmountEL = document.getElementById('evoh--amount');
const hosesEL = document.getElementById('Hoses');
const winchSetEL = document.getElementById('winch--set');
const rollPipeEL = document.getElementById('roll--pipe');

btnOK.addEventListener('click', function () {
  const width = Number(document.querySelector('.width').value);
  const length = Number(document.querySelector('.length').value);
  const gearListCalc = function (pitWidth, pitLength) {
    // tarp adaptor according to given pit width

    const tarpAdaptor = function () {
      if (
        (pitWidth <= 12 && pitWidth >= 9) ||
        (pitWidth >= 19 && pitWidth <= 21)
      ) {
        const pvcWidthNeeded = pvcWidth1;
        return (pvcTypeEL.textContent = pvcWidthNeeded);
      } else if (pitWidth >= 13 && pitWidth <= 18) {
        const pvcWidthNeeded = pvcWidth2;
        return (pvcTypeEL.textContent = pvcWidthNeeded);
      } else if (pitWidth >= 22 && pitWidth <= 24) {
        const pvcWidthNeeded = `${pvcWidth1} + ${pvcWidth1}`;
        return (pvcTypeEL.textContent = pvcWidthNeeded);
      } else if (pitWidth >= 25 && pitWidth <= 27) {
        const pvcWidthNeeded = `${pvcWidth1} + ${pvcWidth2}`;
        return (pvcTypeEL.textContent = pvcWidthNeeded);
      } else if (pitWidth >= 28 && pitWidth <= 30) {
        const pvcWidthNeeded = `${pvcWidth2} + ${pvcWidth2}`;
        return (pvcTypeEL.textContent = pvcWidthNeeded);
      } else if (pitWidth <= 8 || pitWidth >= 31) {
        const pvcWidthNeeded = 'special treatment required';
        return (pvcTypeEL.textContent = pvcWidthNeeded);
      }
    };
    console.log(tarpAdaptor());

    // number of systems required per pit
    const systemsNum = function () {
      if (pitWidth < 22) {
        const systemsNumber = 1;
        return systemsNumber;
      } else if (pitWidth > 21 && pitWidth < 31) {
        const systemsNumber = 2;
        return systemsNumber;
      } else if (pitWidth > 30) {
        const systemsNumber = 'special treatment required';
        return systemsNumber;
      }
    };

    // tarp amount calculator function
    const amoutOfTarpsCalc = function (tarpLength) {
      const entireTarpAmount = pitLength / (tarpLength - 1);
      const standardTarpsAmount = Math.floor(pitLength / (tarpLength - 1));
      const additionalTarpNeeded =
        (entireTarpAmount - standardTarpsAmount) * tarpLength;
      const TarpsToCoverLength = `${standardTarpsAmount} tarps + ${Math.round(
        additionalTarpNeeded
      )} meters of the same kind of tarp`;
      return TarpsToCoverLength;
    };

    // tarp length recognition function
    const lengthCalc = function () {
      if (tarpAdaptor() === pvcWidth1 && pitWidth <= 13) {
        const tarpLength = 22;
        return (pvcAmountEL.textContent = amoutOfTarpsCalc(tarpLength));
      } else if (tarpAdaptor() === pvcWidth1 && pitWidth >= 19) {
        const tarpLength = 13;
        return (pvcAmountEL.textContent = amoutOfTarpsCalc(tarpLength));
      } else if (tarpAdaptor() === pvcWidth2 && pitWidth <= 15) {
        const tarpLength = 19;
        return (pvcAmountEL.textContent = amoutOfTarpsCalc(tarpLength));
      } else if (tarpAdaptor() === pvcWidth2 && pitWidth >= 16) {
        const tarpLength = 16;
        return (pvcAmountEL.textContent = amoutOfTarpsCalc(tarpLength));
        // for cases that require a double system for one pit
      } else if (tarpAdaptor() === `${pvcWidth1} + ${pvcWidth1}`) {
        const tarpLength1 = 22;
        const tarpLength2 = 22;
        return (pvcAmountEL.textContent = `${amoutOfTarpsCalc(
          tarpLength1
        )} ...and... ${amoutOfTarpsCalc(tarpLength2)} 
      (width 13m overlaping another width 13m)`);
      } else if (tarpAdaptor() === `${pvcWidth1} + ${pvcWidth2}`) {
        const tarpLength1 = 22;
        const tarpLength2 = 19;
        return (pvcAmountEL.textContent = `${amoutOfTarpsCalc(
          tarpLength1
        )} ...and... ${amoutOfTarpsCalc(tarpLength2)} 
      (width 13m overlaping another width 16m)`);
      } else if (tarpAdaptor() === `${pvcWidth2} + ${pvcWidth2}`) {
        const tarpLength1 = 19;
        const tarpLength2 = 19;
        return (pvcAmountEL.textContent = `${amoutOfTarpsCalc(
          tarpLength1
        )} ...and... ${amoutOfTarpsCalc(tarpLength2)} 
      (width 16m overlaping another width 16m)`);
      } else if (tarpAdaptor() === 'special treatment required') {
        return (pvcAmountEL.textContent = 'special treatment required');
      }
    };
    console.log(lengthCalc());

    // evoh film adapting by width calculator
    const evohWidthAdaptor = function () {
      if (pitWidth < 16) {
        const evohNeeded = `${evohOption1[0]} x ${evohOption2[1]}`; //array - [width, length]
        return (evohFilmEL.textContent = evohNeeded);
      } else if (pitWidth > 15 && pitWidth < 22) {
        const evohNeeded = `${evohOption2[0]} x ${evohOption2[1]}`; //array - [width, length]
        return (evohFilmEL.textContent = evohNeeded);
      } else if (pitWidth > 21 && pitWidth < 31) {
        const evohNeeded = `${evohOption1[0]} x ${evohOption1[1]} ...and... ${evohOption1[0]} x ${evohOption1[1]} (double system)`;
        return (evohFilmEL.textContent = evohNeeded);
      } else {
        const evohNeeded = 'special treatment required';
        return (evohFilmEL.textContent = evohNeeded);
      }
    };
    console.log(evohWidthAdaptor());

    // evoh film needed by the length of the pit
    const evohLengthAdaptor = function () {
      // the L & S at the end of the variables stands for when the film is longer or shorter than the pit
      const evohLengthNeededL = `standard length (with ${
        evohOption1[1] - pitLength
      }m to spare for each unit)`;
      const evohLengthNeededS = `standard length + ${
        pitLength - evohOption1[1]
      }`;
      if (pitLength < evohOption1[1] && systemsNum() === 1) {
        return (evohAmountEL.textContent = `single unit ,${evohLengthNeededL}`);
      } else if (pitLength < evohOption1[1] && systemsNum() === 2) {
        return (evohAmountEL.textContent = `2 units ,${evohLengthNeededL}`);
      } else if (pitLength > evohOption1[1] && systemsNum() === 1) {
        return (evohAmountEL.textContent = `single unit ,${evohLengthNeededS} meters`);
      } else if (pitLength > evohOption1[1] && systemsNum() === 2) {
        return (evohAmountEL.textContent = `2 unit ,${evohLengthNeededS} meters for each unit`);
      } else {
        return (evohAmountEL.textContent = 'special treatment required');
      }
    };
    console.log(evohLengthAdaptor());

    // hose requirments calculator ()
    const hosesCalc = function () {
      const hoses = [10, 4];
      const hosesFirstDivision = (pitWidth + 8) / hoses[0]; //calculating the number of hose rows required
      const hose10m = Math.floor(hosesFirstDivision);
      const rest10m = hosesFirstDivision - hose10m;
      const hose4m = Math.ceil((rest10m * hoses[0]) / hoses[1]);
      const hosesRowSum = Math.ceil(pitLength / 4);
      const hose10mSum = hose10m * hosesRowSum;
      const hose4mSum = hose4m * hosesRowSum;
      if (systemsNum() === 1) {
        return (hosesEL.textContent = `each row require ${hose10m} units of 10m hose and ${hose4m} units of 4m hose.
    the total sum of hoses needed is ${hose10mSum} of 10m and ${hose4mSum} of 4m`);
      } else if (systemsNum() === 2) {
        return (hosesEL.textContent = `each row require ${hose10m} units of 10m hose and ${hose4m} units of 4m hose.
    the total sum of hoses needed is ${hose10mSum} of 10m and ${hose4mSum} of 4m + ${
          hosesRowSum - 2
        } of 4m hoses for the vertical overlap between the tarps`);
      } else {
        return (hosesEL.textContent = 'special requirments needed');
      }
    };
    console.log(hosesCalc());

    //roll pipe units calculator
    const rollPipeCalc = function () {
      if (systemsNum() === 1) {
        const rollPipesDivision1 = pitWidth / rollPipeLength;
        const rollPipeUnits = Math.floor(rollPipesDivision1);
        const aditionalpiece = Math.round(
          (rollPipesDivision1 - rollPipeUnits) * 3
        );
        return (rollPipeEL.textContent = `${rollPipeUnits} roll-pipe units are needed + ${aditionalpiece} meter piece.`);
      } else if (systemsNum() === 2) {
        if (tarpAdaptor() === `${pvcWidth1} + ${pvcWidth1}`) {
          const rollPipeUnits = 4;
          return (rollPipeEL.textContent = `${
            rollPipeUnits * 2
          } roll-pipes are required for the entire pit (4 for each system)`);
        } else if (tarpAdaptor() === `${pvcWidth1} + ${pvcWidth2}`) {
          const rollPipeUnits1 = 4;
          const rollPipeUnits2 = 5;
          return (rollPipeEL.textContent = `${
            rollPipeUnits1 + rollPipeUnits2
          } roll-pipes are required for the entire pit (4 for one system and 5 for the other)`);
        } else if (tarpAdaptor() === `${pvcWidth2} + ${pvcWidth2}`) {
          const rollPipeUnits = 5;
          return (rollPipeEL.textContent = `${
            rollPipeUnits * 2
          } roll-pipes are required for the entire pit (5 for each system)`);
        }
      } else if (systemsNum() === 'special treatment required') {
        return (rollPipeEL.textContent = 'special treatment required');
      }
    };
    console.log(rollPipeCalc());

    //TODO - make the object items to be displayed properly when runing the program

    // calculating the number of winch sets required for the pit
    const winchSetCalc = function () {
      const winchSet = {
        winch: 2,
        chassis: 2,
        underTarpStrap: 2,
        battarie: 1,
        solarPanel: 1,
        electricityBox: 1,
        cablesLength: 'depends on distance between winch and e-box',
      };
      if (systemsNum() === 1) {
        return (winchSetEL.textContent = `winch + chassis-${winchSet.winch}, under-tarp-straps-${winchSet.underTarpStrap}, battarie-set-${winchSet.battarie}, solar-panel-${winchSet.solarPanel}, electricity-box-${winchSet.electricityBox}, cabels-${winchSet.cablesLength}`);
      } else if (systemsNum() === 2) {
        return (winchSetEL.textContent = `winch + chassis-${
          winchSet.winch * 2
        }, under-tarp-straps-${winchSet.underTarpStrap * 2}, battarie-set-${
          winchSet.battarie * 2
        }, solar-panel-${winchSet.solarPanel * 2}, electricity-box-${
          winchSet.electricityBox * 2
        }, cabels-${winchSet.cablesLength}`);
      } else {
        return (winchSetEL.textContent = 'special treatment required');
      }
    };
    console.log(winchSetCalc());
  };
  gearListCalc(width, length);
});

// the function that measures the amount of each component according to the pit's measurements
