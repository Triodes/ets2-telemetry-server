﻿	var fG_Ind_18 = ["", ".cl", ".ch", ".1l", ".1h", ".2l", ".2h", ".3l", ".3h", ".4l", ".4h", ".5l", ".5h", ".6l", ".6h", ".7l", ".7h", ".8l", ".8h"];
	var fG_Ind_16 = ["", ".1l", ".1h", ".2l", ".2h", ".3l", ".3h", ".4l", ".4h", ".5l", ".5h", ".6l", ".6h", ".7l", ".7h", ".8l", ".8h"];
	var fG_Ind_14 = ["", ".cl", ".ch", ".1l", ".1h", ".2l", ".2h", ".3l", ".3h", ".4l", ".4h", ".5l", ".5h", ".6l", ".6h"];
	var fG_Ind_13 = ["", ".lo", ".1", ".2", ".3", ".4", ".5l", ".5h", ".6l", ".6h", ".7l", ".7h", ".8l", ".8h"];
	var fG_Ind_12 = ["", ".1l", ".1h", ".2l", ".2h", ".3l", ".3h", ".4l", ".4h", ".5l", ".5h", ".6l", ".6h"];
	var fG_Ind_10 = ["", ".1", ".2", ".3", ".4", ".5", ".6", ".7", ".8", ".9", ".10"];
	
	var rG_Ind_4 = ["", ".r1l", ".r1h", ".r2l", ".r2h"];
	var rG_Ind_3 = ["", ".r1", ".r2", ".r3"];
	var rG_Ind_2 = ["", ".r1", ".r2"];
	var rG_Ind_1 = ["", ".r"];

	var allGears = [".r4", ".r2h", ".r3", ".r2l", ".r2", ".r1h", ".r1l", ".r1", ".r", ".cl", ".ch", ".1", ".1l", ".1h", ".2", ".2l", ".2h", ".3", ".3l", ".3h", ".4", ".4l", ".4h", ".5", ".5l", ".5h", ".6", ".6l", ".6h", ".7", ".7l", ".7h", ".8", ".8l", ".8h", ".9", ".10", ".11", ".12"];
	
	var jobS = "saved";

Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {
	//
	// skinConfig - a copy of the skin configuration from config.json
	// utils - an object containing several utility functions (see skin tutorial for more information)
	//

	// this function is called before everything else, 
	// so you may perform any DOM or resource initializations / image preloading here

	/*     utils.preloadImages([
			'images/bg-off.png', 'images/bg-on.png', 'images/needle.png', 'images/needlesmall.png', 'images/RpmArrow.png', 'images/shiftUp.png', 'images/shiftDown.png', 'images/1.png', 'images/1hw.png', 'images/1lw.png', 'images/2.png', 'images/2hw.png', 'images/2lw.png', 'images/3.png', 'images/3hw.png', 'images/3lw.png', '4.png', 'images/4hb.png', 'images/4hw.png', 'images/4lb.png', 'images/4lw.png', 'images/5.png', 'images/5hb.png', 'images/5lb.png', 'images/6.png', 'images/6hb.png', 'images/6lb.png', 'images/7.png', 'images/7hb.png', '7lb.png', 'images/8.png', 'images/8hb.png', 'images/8lb.png', 'images/9.png', 'images/10.png', 'images/chb.png', 'images/chw.png', 'images/clb.png', 'images/clw.png', 'images/r1h.png', 'images/r1l.png', 'images/r2h.png', 'images/r2l.png', 'images/rh.png', 'images/rl.png',
		]); */

};

Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {
    //
    // data - telemetry data JSON object
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // This filter is used to change telemetry data 
    // before it is displayed on the dashboard.
    // You may convert km/h to mph, kilograms to tons, etc.

	// If the game isn't connected, don't both calculating anything.
    if (!data.game.connected) {
        return data;
    }
	
	var fileA = data.game.gameName + "tripA" + data.truck.make.slice(0, 3) + data.truck.model;
	var fileB = data.game.gameName + "tripB" + data.truck.make.slice(0, 3) + data.truck.model;
	var startTripA = localStorage.getItem(fileA);
	var startTripB = localStorage.getItem(fileB);

    data.hasJob = data.cargo.cargoLoaded === true;
    data.truck.cruiseControlSpeedRounded = data.truck.cruiseControlOn
        ? Math.round(data.truck.cruiseControlSpeed)
        : 0;
	if (data.truck.electricOn === true) {
		data.truck.airPressure = data.truck.airPressure;
		data.truck.oilPressure = data.truck.oilPressure;
		data.truck.fuel = data.truck.fuel;
		data.truck.waterTemperature = data.truck.waterTemperature;
	} else if (data.truck.electricOn === false) {
		data.truck.airPressure = 0;
		data.truck.oilPressure = 0;
		data.truck.fuel = 0;
		data.truck.waterTemperature = 0;
	}
	data.truck.placement.roll = data.truck.placement.roll - data.truck.placement.roll - data.truck.placement.roll;
    data.truck.placement.pitchDeg = utils.formatFloat(data.truck.placement.pitch * 360, 1) + '°';
	data.truck.placement.rollDeg = utils.formatFloat(data.truck.placement.roll * 360, 1) + '°';
	var tp = (data.truck.placement.pitch * 360) * 4.2 + 213.5;
		$('.truck-placement-roll').css({top:tp + "px"});

	data.truck.cruiseControlSpeedRoundedMph = data.truck.cruiseControlOn
        ? Math.round(data.truck.cruiseControlSpeed * 0.621371)
        : 0;
	data.navigation.speedLimit = data.navigation.speedLimit;
	data.navigation.speedLimitMph = Math.round(data.navigation.speedLimit * 0.621371);
    // other examples:
	data.truck.odometer = utils.formatFloat(data.truck.odometer, 1);
    data.truck.odometermph = utils.formatFloat(data.truck.odometer * 0.621371, 1);
    // convert gear to readable format
    var FwGears = data.truck.shifterType === 'hshifter' ? [ "N", "CL", "CH", "1L", "1H", "2L", "2H", "3L", "3H", "4L", "4H", "5L", "5H", "6L", "6H", "7L", "7H", "8L", "8H"] : ["N", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

	data.truck.gear = data.truck.displayedGear; // use displayed gear
		
	
    // convert kilometers per hour to miles per hour
    data.truck.speedKph = Math.abs(data.truck.speed);
    data.truck.speedMph = Math.abs(data.truck.speed * 0.621371);
    // convert rpm to rpm * 100
    data.truck.engineRpm = data.truck.engineRpm / 100;
	data.truck.engineRpmDisp = utils.formatFloat(data.truck.engineRpm, 1) * 100;
    // return changed data to the core for rendering
 

	return data;
};

Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {

	var GameN = document.getElementById("name-game").innerHTML;
	var LastDiff = GameN + "LastDiffRat";
	var str = document.getElementById("make").innerHTML;
	var cut = str.slice(0, 3);
	var diff = (localStorage.getItem(LastDiff) * 100);
	var myID = cut + document.getElementById("model").innerHTML + document.getElementById("fWg").innerHTML + document.getElementById("rVg").innerHTML + diff;
	var myTruck = cut + document.getElementById("model").innerHTML;
	var D_RatioID = myID + "D_Ratio";
	var fG_RatioID = myID + "fG_Ratio";
	var rG_RatioID = myID + "rG_Ratio";
	var fSpd_DevId = myID + "fSpd_Dev";
	var rSpd_DevId = myID + "rSpd_Dev";
	var fMxSpdId = myID + "fMxSpd";
	var rMxSpdId = myID + "rMxSpd";
	var firstID = myID + "first";
	var T_DiaID = myTruck + "T_Dia";
	var T_Dia;
	if (T_DiaID !== null) {
		T_Dia = localStorage.getItem(T_DiaID);
	}

	var fWg = document.getElementById("fWg").innerHTML;
	var D_Ratio = localStorage.getItem(D_RatioID);
	var fstGear = localStorage.getItem(firstID);
	var RPM = document.getElementById("RPM").innerHTML;
	var Kph = document.getElementById("KPH").innerHTML;
	var sLg = document.getElementById("sLg").innerHTML;
	var spd = data.truck.speed;

	var fGr = data.truck.forwardGears;
	var rGr = data.truck.reverseGears;
	var gr = data.truck.displayedGear;
	var Rpm = data.truck.engineRpm * 100;
	var acceleration = utils.formatFloat((data.truck.acceleration.z), 4);
	var throttlePos = utils.formatFloat(data.truck.gameThrottle, 2);
	var truckPitch = utils.formatFloat((data.truck.placement.pitch * 100), 2);

	if (!data.game.connected) {
		return data;
	}

	if (data.truck.wearCabin > 0 && data.truck.wearCabin < 0.05) {
		$('.truck-wearCabin').css('backgroundColor', '#28281E');
		$('.truck-wearCabin').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearCabin >= 0.05 && data.truck.wearCabin < 0.1) {
		$('.truck-wearCabin').css('backgroundColor', 'yellow');
		$('.truck-wearCabin').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearCabin >= 0.1 && data.truck.wearCabin < 0.15) {
		$('.truck-wearCabin').css('backgroundColor', 'orange');
		$('.truck-wearCabin').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearCabin >= 0.15) {
		$('.truck-wearCabin').css('backgroundColor', 'red');
		$('.truck-wearCabin').css('animation', 'myreserve 1s linear infinite');
	} else {
		$('.truck-wearCabin').css('backgroundColor', '#28281E');
		$('.truck-wearCabin').css('animation', 'myreserve 0s linear infinite');
	}
	if (data.truck.wearEngine > 0 && data.truck.wearEngine < 0.05) {
		$('.truck-wearEngine').css('backgroundColor', '#28281E');
		$('.truck-wearEngine').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearEngine >= 0.05 && data.truck.wearEngine < 0.1) {
		$('.truck-wearEngine').css('backgroundColor', 'yellow');
		$('.truck-wearEngine').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearEngine >= 0.1 && data.truck.wearEngine < 0.15) {
		$('.truck-wearEngine').css('backgroundColor', 'orange');
		$('.truck-wearEngine').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearEngine >= 0.15) {
		$('.truck-wearEngine').css('backgroundColor', 'red');
		$('.truck-wearEngine').css('animation', 'myreserve 1s linear infinite');
	} else {
		$('.truck-wearEngine').css('backgroundColor', '#28281E');
		$('.truck-wearEngine').css('animation', 'myreserve 0s linear infinite');
	}
	if (data.truck.wearTransmission > 0 && data.truck.wearTransmission < 0.05) {
		$('.truck-wearTransmission').css('backgroundColor', '#28281E');
		$('.truck-wearTransmission').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearTransmission >= 0.05 && data.truck.wearTransmission < 0.1) {
		$('.truck-wearTransmission').css('backgroundColor', 'yellow');
		$('.truck-wearTransmission').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearTransmission >= 0.1 && data.truck.wearTransmission < 0.15) {
		$('.truck-wearTransmission').css('backgroundColor', 'orange');
		$('.truck-wearTransmission').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearTransmission >= 0.15) {
		$('.truck-wearTransmission').css('backgroundColor', 'red');
		$('.truck-wearTransmission').css('animation', 'myreserve 1s linear infinite');
	} else {
		$('.truck-wearTransmission').css('backgroundColor', '#28281E');
		$('.truck-wearTransmission').css('animation', 'myreserve 0s linear infinite');
	}
	if (data.truck.wearChassis > 0 && data.truck.wearChassis < 0.05) {
		$('.truck-wearChassis').css('backgroundColor', '#28281E');
		$('.truck-wearChassis').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearChassis >= 0.05 && data.truck.wearChassis < 0.1) {
		$('.truck-wearChassis').css('backgroundColor', 'yellow');
		$('.truck-wearChassis').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearChassis >= 0.1 && data.truck.wearChassis < 0.15) {
		$('.truck-wearChassis').css('backgroundColor', 'orange');
		$('.truck-wearChassis').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearChassis >= 0.15) {
		$('.truck-wearChassis').css('backgroundColor', 'red');
		$('.truck-wearChassis').css('animation', 'myreserve 1s linear infinite');
	} else {
		$('.truck-wearChassis').css('backgroundColor', '#28281E');
		$('.truck-wearChassis').css('animation', 'myreserve 0s linear infinite');
	}
	if (data.truck.wearWheels > 0 && data.truck.wearWheels < 0.1) {
		$('.truck-wearWheels').css('backgroundColor', '#28281E');
		$('.truck-wearWheels').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearWheels >= 0.1 && data.truck.wearWheels < 0.25) {
		$('.truck-wearWheels').css('backgroundColor', 'yellow');
		$('.truck-wearWheels').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearWheels >= 0.25 && data.truck.wearWheels < 0.4) {
		$('.truck-wearWheels').css('backgroundColor', 'orange');
		$('.truck-wearWheels').css('animation', 'myreserve 0s linear infinite');
	} else if (data.truck.wearWheels >= 0.4) {
		$('.truck-wearWheels').css('backgroundColor', 'red');
		$('.truck-wearWheels').css('animation', 'myreserve 1s linear infinite');
	} else {
		$('.truck-wearWheels').css('backgroundColor', '#28281E');
		$('.truck-wearWheels').css('animation', 'myreserve 0s linear infinite');
	}

	if (data.trailer1.wearChassis > 0 && data.trailer1.wearChassis < 0.05) {
		$('.trailer1-wearChassis').css('backgroundColor', '#28281E');
		$('.trailer1-wearChassis').css('animation', 'myreserve 0s linear infinite');
	} else if (data.trailer1.wearChassis >= 0.05 && data.trailer1.wearChassis < 0.1) {
		$('.trailer1-wearChassis').css('backgroundColor', 'yellow');
		$('.trailer1-wearChassis').css('animation', 'myreserve 0s linear infinite');
	} else if (data.trailer1.wearChassis >= 0.1 && data.trailer1.wearChassis < 0.15) {
		$('.trailer1-wearChassis').css('backgroundColor', 'orange');
		$('.trailer1-wearChassis').css('animation', 'myreserve 0s linear infinite');
	} else if (data.trailer1.wearChassis >= 0.15) {
		$('.trailer1-wearChassis').css('backgroundColor', 'red');
		$('.trailer1-wearChassis').css('animation', 'myreserve 1s linear infinite');
	} else {
		$('.trailer1-wearChassis').css('backgroundColor', '#28281E');
		$('.trailer1-wearChassis').css('animation', 'myreserve 0s linear infinite');
	}

	if (data.trailer1.wearWheels > 0 && data.trailer1.wearWheels < 0.1) {
		$('.trailer1-wearWheels').css('backgroundColor', '#28281E');
		$('.trailer1-wearWheels').css('animation', 'myreserve 0s linear infinite');
	} else if (data.trailer1.wearWheels >= 0.1 && data.trailer1.wearWheels < 0.25) {
		$('.trailer1-wearWheels').css('backgroundColor', 'yellow');
		$('.trailer1-wearWheels').css('animation', 'myreserve 0s linear infinite');
	} else if (data.trailer1.wearWheels >= 0.25 && data.trailer1.wearWheels < 0.4) {
		$('.trailer1-wearWheels').css('backgroundColor', 'orange');
		$('.trailer1-wearWheels').css('animation', 'myreserve 0s linear infinite');
	} else if (data.trailer1.wearWheels >= 0.4) {
		$('.trailer1-wearWheels').css('backgroundColor', 'red');
		$('.trailer1-wearWheels').css('animation', 'myreserve 1s linear infinite');
	} else {
		$('.trailer1-wearWheels').css('backgroundColor', '#28281E');
		$('.trailer1-wearWheels').css('animation', 'myreserve 0s linear infinite');
	}

	var loadMass = document.getElementById("trip-mass").innerHTML;
	var workStat = localStorage.getItem("workStat");

	if (data.cargo.cargoLoaded === false && jobS === "saved") {
		jobS = "empty";
		work_stat();
	}

	if (data.cargo.cargoLoaded === true && data.trailer1.attached === false && jobS === "empty") {
		jobS = "gotJob";
		resetMass();
		work_stat();
		var jobM = loadMass;
	}

	if (data.cargo.cargoLoaded === true && data.trailer1.attached === true && jobS === "gotJob") {
		jobS = "loaded";
		work_stat();
	}

	if (data.job.jobMarket !== "" && data.cargo.cargoLoaded === true && data.trailer1.attached === true && jobS === "loaded") {
		resetTripB();
		jobS = "saved";
	}

	if (localStorage.showId === null) {
		changeDis();
	}

	if (localStorage.showId === "Kph") {
		if (data.truck.electricOn === true) {
			$('.truck-placement-roll').css('visibility', 'visible');
			$('.truck-placement-cover').css('visibility', 'visible');
			$('.dashboard').css('opacity', '1');
			$('.gearSync').css('visibility', 'visible');
			$('.limitSignDisp').css('visibility', 'visible');
			$('.RPMslide').css('visibility', 'visible');
			$('.RevSlide').css('visibility', 'visible');
			$('.truck-id').css('visibility', 'visible');
			$('.truck-kph').css('visibility', 'visible');
			$('.truck-speedKph').css('visibility', 'visible');
			$('.truck-odometer').css('visibility', 'visible');
			$('.navigation-speedLimit').css('visibility', 'visible');
			$('.truck-cruiseControlSpeedRounded').css('visibility', 'visible');
			// $('.truck-gear').css('visibility', 'visible');
			$('.truck-engineRpm').css('visibility', 'visible');
			$('.truck-engineRpmDisp').css('visibility', 'visible');
			$('.truck-airPressure').css('visibility', 'visible');
			$('.truck-oilPressure').css('visibility', 'visible');
			$('.truck-fuel').css('visibility', 'visible');
			$('.truck-waterTemperature').css('visibility', 'visible');
			$('.truck-airPressureWarningOn').css('visibility', 'visible');
			$('.truck-oilPressureWarningOn').css('visibility', 'visible');
			$('.truck-fuelWarningOn').css('visibility', 'visible');
			$('.truck-waterTemperatureWarningOn').css('visibility', 'visible');
			$('.truck-mph').css('visibility', 'hidden');
			$('.truck-speedMph').css('visibility', 'hidden');
			$('.truck-odometermph').css('visibility', 'hidden');
			$('.navigation-speedLimitMph').css('visibility', 'hidden');
			$('.truck-cruiseControlSpeedRoundedMph').css('visibility', 'hidden');
		} else {
			$('.truck-placement-roll').css('visibility', 'hidden');
			$('.truck-placement-cover').css('visibility', 'hidden');
			$('.dashboard').css('opacity', '0.5');
			$('.gearSync').css('visibility', 'hidden');
			$('.limitSignDisp').css('visibility', 'hidden');
			$('.RPMslide').css('visibility', 'hidden');
			$('.RevSlide').css('visibility', 'hidden');
			$('.truck-kph').css('visibility', 'visible');
			$('.truck-airPressureWarningOn').css('visibility', 'hidden');
			$('.truck-oilPressureWarningOn').css('visibility', 'hidden');
			$('.truck-fuelWarningOn').css('visibility', 'hidden');
			$('.truck-waterTemperatureWarningOn').css('visibility', 'hidden');
		}
	} else if (localStorage.showId === "Mph") {
		if (data.truck.electricOn === true) {
			$('.truck-placement-roll').css('visibility', 'visible');
			$('.truck-placement-cover').css('visibility', 'visible');
			$('.dashboard').css('opacity', '1');
			$('.gearSync').css('visibility', 'visible');
			$('.limitSignDisp').css('visibility', 'visible');
			$('.RPMslide').css('visibility', 'visible');
			$('.RevSlide').css('visibility', 'visible');
			$('.truck-id').css('visibility', 'visible');
			$('.truck-mph').css('visibility', 'visible');
			$('.truck-speedMph').css('visibility', 'visible');
			$('.truck-odometermph').css('visibility', 'visible');
			$('.navigation-speedLimitMph').css('visibility', 'visible');
			$('.truck-cruiseControlSpeedRoundedMph').css('visibility', 'visible');
			// $('.truck-gear').css('visibility', 'visible');
			$('.truck-engineRpm').css('visibility', 'visible');
			$('.truck-engineRpmDisp').css('visibility', 'visible');
			$('.truck-airPressure').css('visibility', 'visible');
			$('.truck-oilPressure').css('visibility', 'visible');
			$('.truck-fuel').css('visibility', 'visible');
			$('.truck-waterTemperature').css('visibility', 'visible');
			$('.truck-airPressureWarningOn').css('visibility', 'visible');
			$('.truck-oilPressureWarningOn').css('visibility', 'visible');
			$('.truck-fuelWarningOn').css('visibility', 'visible');
			$('.truck-waterTemperatureWarningOn').css('visibility', 'visible');
			$('.truck-kph').css('visibility', 'hidden');
			$('.truck-speedKph').css('visibility', 'hidden');
			$('.truck-odometer').css('visibility', 'hidden');
			$('.navigation-speedLimit').css('visibility', 'hidden');
			$('.truck-cruiseControlSpeedRounded').css('visibility', 'hidden');
		} else {
			$('.truck-placement-roll').css('visibility', 'hidden');
			$('.truck-placement-cover').css('visibility', 'hidden');
			$('.dashboard').css('opacity', '0.5');
			$('.gearSync').css('visibility', 'hidden');
			$('.limitSignDisp').css('visibility', 'hidden');
			$('.RPMslide').css('visibility', 'hidden');
			$('.RevSlide').css('visibility', 'hidden');
			$('.truck-airPressureWarningOn').css('visibility', 'hidden');
			$('.truck-oilPressureWarningOn').css('visibility', 'hidden');
			$('.truck-fuelWarningOn').css('visibility', 'hidden');
			$('.truck-waterTemperatureWarningOn').css('visibility', 'hidden');
		}
	}

	if (data.job.jobMarket !== "quick_job") {

		if (localStorage.getItem(fG_RatioID) !== null) {
			var fG_Rat = [localStorage.getItem(fG_RatioID)];
		}

		var fSpd_Dev = localStorage.getItem(fSpd_DevId);
		fSpd_Dev = fSpd_Dev ? fSpd_Dev.split([', ']) : [,];

		var fMxSpd = localStorage.getItem(fMxSpdId);
		fMxSpd = fMxSpd ? fMxSpd.split([', ']) : [,];

		if (localStorage.getItem(rG_RatioID) !== null) {
			var rG_Rat = [localStorage.getItem(rG_RatioID)];
		}

		var rSpd_Dev = localStorage.getItem(rSpd_DevId);
		rSpd_Dev = rSpd_Dev ? rSpd_Dev.split([', ']) : [,];

		var rMxSpd = localStorage.getItem(rMxSpdId);
		rMxSpd = rMxSpd ? rMxSpd.split([', ']) : [,];
		var fi;
		var ri;
		var fSet;
		var rSet;
		if (localStorage.getItem("fi") === null) {
			localStorage.setItem("fi", 1);
			fi = localStorage.getItem("fi");
		} else {
			fi = localStorage.getItem("fi");
		}
		if (localStorage.getItem("ri") === null) {
			localStorage.setItem("ri", 1);
			ri = localStorage.getItem("ri");
		} else {
			ri = localStorage.getItem("ri");
		}
		if (localStorage.getItem("fSet") === null) {
			localStorage.setItem("fSet", 0);
			fSet = localStorage.getItem("fSet");
		} else {
			fSet = localStorage.getItem("fSet");
		}
		if (localStorage.getItem("rSet") === null) {
			localStorage.setItem("rSet", 0);
			rSet = localStorage.getItem("rSet");
		} else {
			rSet = localStorage.getItem("rSet");
		}

		var Drat = utils.formatFloat(localStorage.getItem(D_RatioID), 1);
		var x;
		var y;
		var z;
		if (fi <= fGr && spd > 0.5 && Drat !== null && fSet === 0) {
			if (fi <= fGr + 1) {
				if (fi === gr) {
					if (RPM > 1490) {
						if (gr === 1) {
							var t = (1000 / (RPM / fstGear / D_Ratio * (60 / spd)) / Math.PI * 1000).toFixed(0);
							localStorage.setItem(T_DiaID, t);
							T_Dia = localStorage.getItem(T_DiaID);
						}
						var fG_Ratio = Math.abs(Rpm / D_Ratio * (Math.PI * T_Dia / 1000) * 60 / spd / 1000).toFixed(2);
						var fspd_D = Math.abs(RPM / (RPM / fG_Ratio / D_Ratio * (Math.PI * T_Dia / 1000) * 60 / 1000) * 0.821932).toFixed(3);
						fG_Rat.push('"' + fG_Ratio + '"');
						fSpd_Dev.push('"' + fspd_D + '"');
						fMxSpd.push('"' + spd.toFixed(3) + '"');
						fi++;
						localStorage.setItem("fi", fi);
						var fG_RatioValue = fG_Rat;
						var fSpd_DevValue = fSpd_Dev;
						var fMxSpdValue = fMxSpd;
						SetfG_Ratio(fG_RatioID, fG_RatioValue);
						SetfSpd_Dev(fSpd_DevId, fSpd_DevValue);
						SetfMxSpd(fMxSpdId, fMxSpdValue);
						if (fi > fGr) {
							x = localStorage.getItem(fG_RatioID);
							fG_RatioValue = '[""' + x + "]";
							SetfG_Ratio(fG_RatioID, fG_RatioValue);
							y = localStorage.getItem(fSpd_DevId);
							fSpd_DevValue = '[""' + y + "]";
							SetfSpd_Dev(fSpd_DevId, fSpd_DevValue);
							z = localStorage.getItem(fMxSpdId);
							fMxSpdValue = '[""' + z + "]";
							SetfMxSpd(fMxSpdId, fMxSpdValue);
							localStorage.setItem("fi", 1);
							localStorage.setItem("fSet", 1);
							clip2.play();
						} else {
							clip1.play();
						}
					}
				}
			}
			// closeGears();
		} else if (Drat === null && data.game.connected.yes) {
			openErr();
		}

		if (ri <= rGr && spd < 0.5 && Drat !== null && rSet === 0) {
			if (ri <= rGr + 1) {
				if (ri === Math.abs(gr)) {
					if (RPM > 1490) {
						var rG_Ratio = Math.abs(Rpm / D_Ratio * (Math.PI * T_Dia / 1000) * 60 / Math.abs(spd) / 1000).toFixed(2);
						var rspd_D = Math.abs(RPM / (RPM / rG_Ratio / D_Ratio * (Math.PI * T_Dia / 1000) * 60 / 1000) * 0.821932).toFixed(3);
						rG_Rat.push('"' + rG_Ratio + '"');
						rSpd_Dev.push('"' + rspd_D + '"');
						rMxSpd.push('"' + Math.abs(spd).toFixed(3) + '"');
						ri++;
						localStorage.setItem("ri", ri);
						var rG_RatioValue = rG_Rat;
						var rSpd_DevValue = rSpd_Dev;
						var rMxSpdValue = rMxSpd;
						SetrG_Ratio(rG_RatioID, rG_RatioValue);
						SetrSpd_Dev(rSpd_DevId, rSpd_DevValue);
						SetrMxSpd(rMxSpdId, rMxSpdValue);
						if (ri > rGr) {
							x = localStorage.getItem(rG_RatioID);
							rG_RatioValue = '[""' + x + "]";
							SetrG_Ratio(rG_RatioID, rG_RatioValue);
							y = localStorage.getItem(rSpd_DevId);
							rSpd_DevValue = '[""' + y + "]";
							SetrSpd_Dev(rSpd_DevId, rSpd_DevValue);
							z = localStorage.getItem(rMxSpdId);
							rMxSpdValue = '[""' + z + "]";
							SetrMxSpd(rMxSpdId, rMxSpdValue);
							localStorage.setItem("ri", 1);
							localStorage.setItem("rSet", 1);
							clip3.play();
						} else {
							clip1.play();
						}
					}
				}
			}
			// closeGears();
		} else if (Drat === null && data.game.connected.yes) {
			openErr();
		}

		var Gr_Ch;
		var rGr_Spd;
		var rGr_S;
		if (gr >= 0 && spd > 0 && fSet === 1 && D_Ratio !== null) {
			var fGr_Spd = [localStorage.getItem(fMxSpdId)];
			var fGr_S = JSON.parse(fGr_Spd);
			if (spd > fGr_S[fGr]) {
				Gr_Ch = (fGr);
			} else {
				Gr_Ch = fGr_S.indexOf(fGr_S.find(myFunctionA));
			}
		} else if (gr <= 0 && spd < 0 && rSet === 1 && D_Ratio !== null) {
			rGr_Spd = [localStorage.getItem(rMxSpdId)];
			rGr_S = JSON.parse(rGr_Spd);
			Gr_Ch = rGr_S.indexOf(rGr_S.find(myFunctionA));
		}

		var fGr_Rat;
		var fGear;
		var Rev;
		if (spd > 0 && fSet === 1 && D_Ratio !== null) {
			fGr_Rat = [localStorage.getItem(fG_RatioID)];
			fGear = JSON.parse(fGr_Rat);
			Rev = Math.floor(1000 / (Math.PI * T_Dia / 1000) * spd * D_Ratio * (fGear[Gr_Ch]) / 60);	//Rev's according to forward speed.
		} else if (spd < 0 && rSet === 1 && D_Ratio !== null) {
			rGr_Rat = [localStorage.getItem(rG_RatioID)];
			rGear = JSON.parse(rGr_Rat);
			Rev = Math.abs(1000 / (Math.PI * T_Dia / 1000) * Math.abs(spd) * D_Ratio * (rGear[Gr_Ch]) / 60);	//Rev's according to reverse speed.
		}


		var oRL = 175;
		if (gr >= 0 && spd > 0 && fSet === 1) {
			if (localStorage.getItem(fSpd_DevId) !== null) {
				var fSpd_Dev = [localStorage.getItem(fSpd_DevId)];
				var fSpD_D = JSON.parse(fSpd_Dev);
				for (i = 1; i < (fGr + 1); i++) {
					if ((fGr === 18 && oRL + spd * fSpD_D[i] > 365) && (oRL + spd * fSpD_D[i] < 2250)) {
						$(fG_Ind_18[i]).css({ left: oRL + spd * fSpD_D[i] + "px", opacity: 1 });
					} else if ((fGr === 16 && oRL + spd * fSpD_D[i] > 365) && (oRL + spd * fSpD_D[i] < 2250)) {
						$(fG_Ind_16[i]).css({ left: oRL + spd * fSpD_D[i] + "px", opacity: 1 });
					} else if ((fGr === 14 && oRL + spd * fSpD_D[i] > 365) && (oRL + spd * fSpD_D[i] < 2250)) {
						$(fG_Ind_14[i]).css({ left: oRL + spd * fSpD_D[i] + "px", opacity: 1 });
					} else if ((fGr === 13 && oRL + spd * fSpD_D[i] > 365) && (oRL + spd * fSpD_D[i] < 2250)) {
						$(fG_Ind_13[i]).css({ left: oRL + spd * fSpD_D[i] + "px", opacity: 1 });
					} else if ((fGr === 12 && oRL + spd * fSpD_D[i] > 365) && (oRL + spd * fSpD_D[i] < 2250)) {
						$(fG_Ind_12[i]).css({ left: oRL + spd * fSpD_D[i] + "px", opacity: 1 });
					} else if ((fGr === 10 && oRL + spd * fSpD_D[i] > 365) && (oRL + spd * fSpD_D[i] < 2250)) {
						$(fG_Ind_10[i]).css({ left: oRL + spd * fSpD_D[i] + "px", opacity: 1 });
					} else {
						$(fG_Ind_18[i]).css({ left: 0 + "px", opacity: 0 });
						$(fG_Ind_16[i]).css({ left: 0 + "px", opacity: 0 });
						$(fG_Ind_14[i]).css({ left: 0 + "px", opacity: 0 });
						$(fG_Ind_13[i]).css({ left: 0 + "px", opacity: 0 });
						$(fG_Ind_12[i]).css({ left: 0 + "px", opacity: 0 });
						$(fG_Ind_10[i]).css({ left: 0 + "px", opacity: 0 });
					}
				}
			}
		} else if (gr <= 0 && spd < 0 && rSet === 1) {
			if (localStorage.getItem(rSpd_DevId) !== null) {
				var rSpd_Dev = [localStorage.getItem(rSpd_DevId)];
				var rspD_D = JSON.parse(rSpd_Dev);
				for (i = 0; i <= rGr; i++) {
					if ((rGr === 4 && oRL + Math.abs(spd * rspD_D[i]) > 365) && (oRL + Math.abs(spd * rspD_D[i]) < 2250)) {
						$(rG_Ind_4[i]).css({ left: oRL + Math.abs(spd * rspD_D[i]) + "px", opacity: 1 });
					} else if ((rGr === 3 && oRL + Math.abs(spd * rspD_D[i]) > 365) && (oRL + Math.abs(spd * rspD_D[i]) < 2250)) {
						$(rG_Ind_3[i]).css({ left: oRL + Math.abs(spd * rspD_D[i]) + "px", opacity: 1 });
					} else if ((rGr === 2 && oRL + Math.abs(spd * rspD_D[i]) > 365) && (oRL + Math.abs(spd * rspD_D[i]) < 2250)) {
						$(rG_Ind_2[i]).css({ left: oRL + Math.abs(spd * rspD_D[i]) + "px", opacity: 1 });
					} else if ((rGr === 1 && oRL + Math.abs(spd * rspD_D[i]) > 365) && (oRL + Math.abs(spd * rspD_D[i]) < 2250)) {
						$(rG_Ind_1[i]).css({ left: oRL + Math.abs(spd * rspD_D[i]) + "px", opacity: 1 });
					} else {
						$(rG_Ind_4[i]).css({ left: 0 + "px", opacity: 0 });
						$(rG_Ind_3[i]).css({ left: 0 + "px", opacity: 0 });
						$(rG_Ind_2[i]).css({ left: 0 + "px", opacity: 0 });
						$(rG_Ind_1[i]).css({ left: 0 + "px", opacity: 0 });
					}
				}
			}
		} else {
			allGears.forEach(noGears);
		}

		function noGears(value) {
			$({ value }).css({ left: 0 + "px", opacity: 0 });
		}
	}

	if (spd > data.navigation.speedLimit + 1 || spd * 0.621371 > data.navigation.speedLimitMph + 1) {
		$('.navigation-speedLimit').css('color', 'red');
		$('.navigation-speedLimitMph').css('color', 'red');
	} else {
		$('.navigation-speedLimit').css('color', '#2491b9');
		$('.navigation-speedLimitMph').css('color', '#2491b9');
	}
	if (data.truck.cruiseControlSpeed > data.navigation.speedLimit + 0.1) {
		$('.truck-cruiseControlSpeedRounded').css('color', 'red');
		$('.truck-cruiseControlSpeedRoundedMph').css('color', 'red');
	} else {
		$('.truck-cruiseControlSpeedRounded').css('color', '#24b999');
		$('.truck-cruiseControlSpeedRoundedMph').css('color', '#24b999');
	}

	if (data.truck.engineRpm > 0) {
		if (data.truck.shifterType === "hshifter" || data.truck.shifterType === "manual") {
			$('.RPMslide').css({ left: ((data.truck.engineRpm * 84) + 168) + "px" });
			$('.RevSlide').css({ left: ((Rev / 100 * 84) + 168) + "px" });
		} else if (data.truck.shifterType === "arcade" || data.truck.shifterType === "automatic") {
			$('.RPMslide').css({ left: ((data.truck.engineRpm * 84) + 168) + "px" });
			$('.RevSlide').css({ left: ((data.truck.engineRpm * 84) + 168) + "px" });
		}
	} else {
		$('.RPMslide').css('left', '168px');
		$('.RevSlide').css('left', '168px');
	}

	if (Math.abs(spd) > 5 && gr !== 0) {
		var divr = (((data.truck.engineRpm * 84) + 168) - ((Rev / 100 * 84) + 168)).toFixed(2)
		if (data.truck.shifterType === "hshifter" || data.truck.shifterType === "manual") {
			if (divr < -200 && divr >= -300) {	// slowing down.
				data.truck.nextGear = (data.truck.gear - 1);
				$('.shiftDown').css('visibility', 'visible');
				$('.shiftUp').css('visibility', 'hidden');
				$('.shiftDown').css('animation', 'myShiftGreen 2s linear infinite');
			} else if (divr < -300 && divr >= -600) {	// slowing down.
				data.truck.nextGear = (data.truck.gear - 2);
				$('.shiftDown').css('visibility', 'visible');
				$('.shiftUp').css('visibility', 'hidden');
				$('.shiftDown').css('animation', 'myShiftRed 1s linear infinite');
			} else if (divr < -600) {
				data.truck.nextGear = (data.truck.gear - 3);
				$('.shiftDown').css('visibility', 'visible');
				$('.shiftUp').css('visibility', 'hidden');
				$('.shiftDown').css('animation', 'myShiftRed 0.5s linear infinite');
			} else if (divr > 200 && divr <= 300) {	// accelerating, speeding up.
				if (data.truck.gear === fGr - 1) {
					data.truck.nextGear = (data.truck.gear + 1);
				} else {
					data.truck.nextGear = (data.truck.gear + 1);
				}
				$('.shiftDown').css('visibility', 'hidden');
				$('.shiftUp').css('visibility', 'visible');
				$('.shiftUp').css('animation', 'myShiftGreen 2s linear infinite');
			} else if (divr > 300 && divr <= 600) {	// accelerating, speeding up.
				if (data.truck.gear === fGr - 2) {
					data.truck.nextGear = (data.truck.gear + 2);
				} else if (data.truck.gear === fGr - 1) {
					data.truck.nextGear = (data.truck.gear + 1);
				} else {
					data.truck.nextGear = (data.truck.gear + 2);
				}
				$('.shiftDown').css('visibility', 'hidden');
				$('.shiftUp').css('visibility', 'visible');
				$('.shiftUp').css('animation', 'myShiftRed 1s linear infinite');
			} else if (divr > 600) {
				if (data.truck.gear === fGr - 3) {
					data.truck.nextGear = (data.truck.gear + 3);
				} else if (data.truck.gear === fGr - 2) {
					data.truck.nextGear = (data.truck.gear + 2);
				} else if (data.truck.gear === fGr - 1) {
					data.truck.nextGear = (data.truck.gear + 1);
				} else {
					data.truck.nextGear = (data.truck.gear + 3);
				}
				$('.shiftDown').css('visibility', 'hidden');
				$('.shiftUp').css('visibility', 'visible');
				$('.shiftUp').css('animation', 'myShiftRed 0.5s linear infinite');
			} else {
				data.truck.nextGear = data.truck.gear;
				$('.shiftDown').css('visibility', 'hidden');
				$('.shiftUp').css('visibility', 'hidden');
			}
		} else {
			$('.shiftDown').css('visibility', 'hidden');
			$('.shiftUp').css('visibility', 'hidden');
		}
	} else {
		$('.truck-nextGear').css('animation', 'blinker 0s linear infinite');
		data.truck.nextGear = 0;
		$('.shiftDown').css('visibility', 'hidden');
		$('.shiftUp').css('visibility', 'hidden');
	}

	if (data.truck.shifterType === "hshifter" || data.truck.shifterType === "manual") {
		$('.truck-gear').css({ left: 0 + "px", top: 0 + "px", width: 0 + "px", height: 0 + "px", position: "absolute", zIndex: 3, fontFamily: "LCDMono", fontSize: 0 + "px", color: "#0026FF", textAlign: "right" });
		if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
			if (data.truck.forwardGears === 18 && data.truck.reverseGears === 4) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_18x4.png")' });
			} else if ((data.truck.forwardGears === 18 && data.truck.reverseGears === 2) || (data.truck.forwardGears === 18 && data.truck.reverseGears === 3)) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_18x2.png")' });
			} else if ((data.truck.forwardGears === 13 && data.truck.reverseGears === 2) || (data.truck.forwardGears === 13 && data.truck.reverseGears === 3)) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_13x3.png")' });
			} else if (data.truck.forwardGears === 10 && data.truck.reverseGears === 2) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_10x2.png")' });
			}
		}
		if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
			if (data.truck.forwardGears === 16 && data.truck.reverseGears === 2) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_zf_16x2.png")' });
			} else if (data.truck.forwardGears === 12 && data.truck.reverseGears === 2) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_zf_12x2.png")' });
			}
		}
		if (data.truck.id === "scania") {
			if (data.truck.forwardGears === 14) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_sc_12+2x2.png")' });
			} else if (data.truck.forwardGears === 12) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_sc_12x2.png")' });
			}
		}
		if (data.truck.id === "mack" || data.truck.id === "volvo") {
			if (data.truck.forwardGears === 14) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_vo_12+2x4.png")' });
			} else if (data.truck.forwardGears === 12) {
				$('.truck-nextGear').css('visibility', 'visible');
				$('.truck-shiftPattern').css({ left: 30 + "px", top: 333 + "px", width: 934 + "px", height: 993 + "px", position: "absolute", zIndex: 2, backgroundImage: 'url("../skins/18speed/images/gearPattern_vo_12x4.png")' });
			}
		}
	} else if (data.truck.shifterType === "automatic" || data.truck.shifterType === "arcade") {
		$('.truck-nextGear').css('visibility', 'hidden');
		$('.truck-shiftPattern').css({ left: 120 + "px", top: 433 + "px", width: 770 + "px", height: 777 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/Auto.png")' });
		$('.truck-gear').css({ left: 577 + "px", top: 709 + "px", width: 254 + "px", height: 192 + "px", position: "absolute", zIndex: 3, fontFamily: "LCDMono", fontSize: 200 + "px", fontWeight: "bold", color: "#0026FF", textAlign: "right" });
	}
	if (data.truck.gear < 0) {
		if (data.truck.shifterType === "hshifter" || data.truck.shifterType === "manual") {
			if (data.truck.gear === -1) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if ((data.truck.forwardGears === 18 || data.truck.forwardGears === 13) && (data.truck.reverseGears === 4 || data.truck.reverseGears === 3)) {
						$('.truck-displayedGear').css({ left: 54 + "px", top: 351 + "px", width: 212 + "px", height: 350 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/r1l.png")' });
					} else if (data.truck.reverseGears === 2) {
						$('.truck-displayedGear').css({ left: 134 + "px", top: 349 + "px", width: 100 + "px", height: 340 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/rl.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					$('.truck-displayedGear').css({ left: 134 + "px", top: 962 + "px", width: 100 + "px", height: 341 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/rl.png")' });
				}
				if (data.truck.id === "scania") {
					$('.truck-displayedGear').css({ left: 134 + "px", top: 349 + "px", width: 100 + "px", height: 340 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/rl.png")' });
				}
				if ((data.truck.id === "mack" || data.truck.id === "volvo") && (data.truck.forwardGears === 12 || data.truck.forwardGears === 14)) {
					$('.truck-displayedGear').css({ left: 53 + "px", top: 957 + "px", width: 212 + "px", height: 353 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/r1l.png")' });
				}
			}
			if (data.truck.gear === -2) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if ((data.truck.forwardGears === 18 || data.truck.forwardGears === 13) && (data.truck.reverseGears === 4 || data.truck.reverseGears === 3)) {
						$('.truck-displayedGear').css({ left: 54 + "px", top: 351 + "px", width: 212 + "px", height: 350 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/r1h.png")' });
					} else if (data.truck.reverseGears === 2) {
						$('.truck-displayedGear').css({ left: 134 + "px", top: 349 + "px", width: 100 + "px", height: 340 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/rh.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					$('.truck-displayedGear').css({ left: 134 + "px", top: 962 + "px", width: 100 + "px", height: 341 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/rh.png")' });
				}
				if (data.truck.id === "scania") {
					$('.truck-displayedGear').css({ left: 134 + "px", top: 349 + "px", width: 100 + "px", height: 340 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/rh.png")' });
				}
				if ((data.truck.id === "mack" || data.truck.id === "volvo") && (data.truck.forwardGears === 12 || data.truck.forwardGears === 14)) {
					$('.truck-displayedGear').css({ left: 53 + "px", top: 957 + "px", width: 212 + "px", height: 353 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/r1h.png")' });
				}
			}
			if (data.truck.gear === -3) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18 && data.truck.reverseGears === 4) {
						$('.truck-displayedGear').css({ left: 54 + "px", top: 351 + "px", width: 212 + "px", height: 350 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/r2l.png")' });
					} else if (data.truck.forwardGears === 13 && data.truck.reverseGears === 3) {
						$('.truck-displayedGear').css({ left: 54 + "px", top: 351 + "px", width: 100 + "px", height: 340 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/rh.png")' });
					}
				}
				if ((data.truck.id === "mack" || data.truck.id === "volvo") && (data.truck.forwardGears === 12 || data.truck.forwardGears === 14)) {
					$('.truck-displayedGear').css({ left: 53 + "px", top: 957 + "px", width: 212 + "px", height: 353 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/r2l.png")' });
				}
			}
			if (data.truck.gear === -4) {
				if ((data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") && data.truck.forwardGears === 18) {
					$('.truck-displayedGear').css({ left: 54 + "px", top: 351 + "px", width: 212 + "px", height: 350 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/r2h.png")' });
				} else if (data.truck.id === "mack" || data.truck.id === "volvo") {
					$('.truck-displayedGear').css({ left: 53 + "px", top: 957 + "px", width: 212 + "px", height: 353 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/r2h.png")' });
				}
			}
		} else if (data.truck.shifterType === "automatic" || data.truck.shifterType === "arcade") {
			$('.truck-displayedGear').css({ left: 193 + "px", top: 475 + "px", width: 210 + "px", height: 210 + "px", position: "absolute", zIndex: 4, backgroundImage: 'url("../skins/18speed/images/gearhighlight.png")' });
		}
	} else if (data.truck.gear === 0) {
		if (data.truck.shifterType === "hshifter" || data.truck.shifterType === "manual") {
			$('.truck-displayedGear').css({ left: 457 + "px", top: 764 + "px", width: 89 + "px", height: 137 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/N.png")' });
		} else if (data.truck.shifterType === "automatic" || data.truck.shifterType === "arcade") {
			$('.truck-displayedGear').css({ left: 193 + "px", top: 709 + "px", width: 210 + "px", height: 210 + "px", position: "absolute", zIndex: 4, backgroundImage: 'url("../skins/18speed/images/gearhighlight.png")' });
		}
	} else if (data.truck.gear > 0) {
		if (data.truck.shifterType === "hshifter" || data.truck.shifterType === "manual") {
			if (data.truck.nextGear === 0) {
				$('.truck-nextGear').css({ left: 0 + "px", top: 0 + "px", width: 0 + "px", height: 0 + "px", position: "absolute", zIndex: -1 });
			}
			if (data.truck.gear === 1) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 45 + "px", top: 1053 + "px", width: 245 + "px", height: 170 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/clb.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 125 + "px", top: 1064 + "px", width: 97 + "px", height: 141 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/cb.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 142 + "px", top: 1152 + "px", width: 49 + "px", height: 138 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					$('.truck-displayedGear').css({ left: 386 + "px", top: 529 + "px", width: 204 + "px", height: 170 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 48 + "px", top: 1055 + "px", width: 242 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/clw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 386 + "px", top: 1142 + "px", width: 204 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 48 + "px", top: 445 + "px", width: 242 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/clw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 385 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
					}
				}
			}
			if (data.truck.nextGear === 1) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 45 + "px", top: 1053 + "px", width: 245 + "px", height: 170 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/clb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 125 + "px", top: 1064 + "px", width: 97 + "px", height: 141 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/cb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 142 + "px", top: 1152 + "px", width: 49 + "px", height: 138 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					$('.truck-nextGear').css({ left: 386 + "px", top: 529 + "px", width: 204 + "px", height: 170 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
					$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 48 + "px", top: 1055 + "px", width: 242 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/clw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 386 + "px", top: 1142 + "px", width: 204 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 48 + "px", top: 445 + "px", width: 242 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/clw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 385 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 2) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 45 + "px", top: 1053 + "px", width: 245 + "px", height: 170 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/chb.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 462 + "px", top: 536 + "px", width: 49 + "px", height: 138 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 457 + "px", top: 549 + "px", width: 73 + "px", height: 130 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					$('.truck-displayedGear').css({ left: 386 + "px", top: 529 + "px", width: 204 + "px", height: 170 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 48 + "px", top: 1055 + "px", width: 242 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/chw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 386 + "px", top: 1142 + "px", width: 204 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 48 + "px", top: 445 + "px", width: 242 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/chw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 385 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
					}
				}
			}
			if (data.truck.nextGear === 2) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 45 + "px", top: 1053 + "px", width: 245 + "px", height: 170 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/chb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 462 + "px", top: 536 + "px", width: 49 + "px", height: 138 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 457 + "px", top: 549 + "px", width: 73 + "px", height: 130 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					$('.truck-nextGear').css({ left: 386 + "px", top: 529 + "px", width: 204 + "px", height: 170 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
					$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 48 + "px", top: 1055 + "px", width: 242 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/chw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 386 + "px", top: 1142 + "px", width: 204 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 48 + "px", top: 445 + "px", width: 242 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/chw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 385 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 3) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 386 + "px", top: 529 + "px", width: 194 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 457 + "px", top: 1153 + "px", width: 75 + "px", height: 137 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 458 + "px", top: 1150 + "px", width: 74 + "px", height: 140 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 388 + "px", top: 1143 + "px", width: 202 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 717 + "px", top: 529 + "px", width: 206 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 386 + "px", top: 1142 + "px", width: 204 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 717 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 385 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 385 + "px", top: 1148 + "px", width: 204 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
					}
				}
			}
			if (data.truck.nextGear === 3) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 386 + "px", top: 529 + "px", width: 194 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 457 + "px", top: 1153 + "px", width: 75 + "px", height: 137 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 458 + "px", top: 1150 + "px", width: 74 + "px", height: 140 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 388 + "px", top: 1143 + "px", width: 202 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 717 + "px", top: 529 + "px", width: 206 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 386 + "px", top: 1142 + "px", width: 204 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 717 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 385 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 385 + "px", top: 1148 + "px", width: 204 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 4) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 386 + "px", top: 529 + "px", width: 194 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 787 + "px", top: 543 + "px", width: 74 + "px", height: 139 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 781 + "px", top: 540 + "px", width: 81 + "px", height: 138 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 388 + "px", top: 1143 + "px", width: 202 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 717 + "px", top: 529 + "px", width: 206 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 386 + "px", top: 1142 + "px", width: 204 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 717 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 385 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 385 + "px", top: 1148 + "px", width: 204 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
					}
				}
			}
			if (data.truck.nextGear === 4) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 386 + "px", top: 529 + "px", width: 194 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 787 + "px", top: 543 + "px", width: 74 + "px", height: 139 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 781 + "px", top: 540 + "px", width: 81 + "px", height: 138 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 388 + "px", top: 1143 + "px", width: 202 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 717 + "px", top: 529 + "px", width: 206 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 386 + "px", top: 1142 + "px", width: 204 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 717 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 385 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/1hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 385 + "px", top: 1148 + "px", width: 204 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 5) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 388 + "px", top: 1143 + "px", width: 202 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 780 + "px", top: 1163 + "px", width: 81 + "px", height: 138 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 784 + "px", top: 1153 + "px", width: 74 + "px", height: 137 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 529 + "px", width: 212 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 717 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 385 + "px", top: 1148 + "px", width: 204 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 536 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
					}
				}
			}
			if (data.truck.nextGear === 5) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 388 + "px", top: 1143 + "px", width: 202 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 780 + "px", top: 1163 + "px", width: 81 + "px", height: 138 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 784 + "px", top: 1153 + "px", width: 74 + "px", height: 137 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 529 + "px", width: 212 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 1144 + "px", width: 197 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 717 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 385 + "px", top: 1148 + "px", width: 204 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 536 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 6) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 388 + "px", top: 1143 + "px", width: 202 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 343 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 130 + "px", top: 972 + "px", width: 75 + "px", height: 139 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 529 + "px", width: 212 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 717 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 385 + "px", top: 1148 + "px", width: 204 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 536 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
					}
				}
			}
			if (data.truck.nextGear === 6) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 388 + "px", top: 1143 + "px", width: 202 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 343 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 130 + "px", top: 972 + "px", width: 75 + "px", height: 139 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 529 + "px", width: 212 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 717 + "px", top: 532 + "px", width: 204 + "px", height: 166 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 385 + "px", top: 1148 + "px", width: 204 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/2hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 536 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 7) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 529 + "px", width: 212 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 343 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 458 + "px", top: 361 + "px", width: 72 + "px", height: 135 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 1144 + "px", width: 212 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 380 + "px", top: 346 + "px", width: 210 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 957 + "px", width: 214 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 536 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 347 + "px", width: 214 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
					}
				}
			}
			if (data.truck.nextGear === 7) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 529 + "px", width: 212 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 343 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 458 + "px", top: 361 + "px", width: 72 + "px", height: 135 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 1144 + "px", width: 212 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 380 + "px", top: 346 + "px", width: 210 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 957 + "px", width: 214 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 536 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 347 + "px", width: 214 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 8) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 529 + "px", width: 212 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 374 + "px", top: 955 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 458 + "px", top: 972 + "px", width: 73 + "px", height: 139 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 1144 + "px", width: 212 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 380 + "px", top: 346 + "px", width: 210 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 957 + "px", width: 214 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 713 + "px", top: 536 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 347 + "px", width: 214 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
					}
				}
			}
			if (data.truck.nextGear === 8) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 529 + "px", width: 212 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 374 + "px", top: 955 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 458 + "px", top: 972 + "px", width: 73 + "px", height: 139 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 1144 + "px", width: 212 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 380 + "px", top: 346 + "px", width: 210 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 1144 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 957 + "px", width: 214 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 713 + "px", top: 536 + "px", width: 210 + "px", height: 164 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/3hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 347 + "px", width: 214 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 9) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 1144 + "px", width: 212 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lw.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 374 + "px", top: 955 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 784 + "px", top: 360 + "px", width: 75 + "px", height: 139 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/9.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 346 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 957 + "px", width: 214 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 347 + "px", width: 214 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 378 + "px", top: 960 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
					}
				}
			}
			if (data.truck.nextGear === 9) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 1144 + "px", width: 212 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 374 + "px", top: 955 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 784 + "px", top: 360 + "px", width: 75 + "px", height: 139 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/9.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 346 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 957 + "px", width: 214 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 347 + "px", width: 214 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 378 + "px", top: 960 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 10) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 1144 + "px", width: 212 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hw.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 708 + "px", top: 342 + "px", width: 216 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7lb.png")' });
					} else if (data.truck.forwardGears === 10) {
						$('.truck-displayedGear').css({ left: 756 + "px", top: 971 + "px", width: 133 + "px", height: 140 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/10.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 346 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 957 + "px", width: 214 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 347 + "px", width: 214 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 378 + "px", top: 960 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
					}
				}
			}
			if (data.truck.nextGear === 10) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 1144 + "px", width: 212 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hw.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 708 + "px", top: 342 + "px", width: 216 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 10) {
						$('.truck-nextGear').css({ left: 756 + "px", top: 971 + "px", width: 133 + "px", height: 140 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/10.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 346 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 957 + "px", width: 214 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 347 + "px", width: 214 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/4hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 378 + "px", top: 960 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 11) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 346 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 708 + "px", top: 342 + "px", width: 216 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7hb.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 374 + "px", top: 955 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 715 + "px", top: 958 + "px", width: 209 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 710 + "px", top: 959 + "px", width: 216 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 378 + "px", top: 960 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 350 + "px", width: 214 + "px", height: 161 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
					}
				}
			}
			if (data.truck.nextGear === 11) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 346 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 708 + "px", top: 342 + "px", width: 216 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 374 + "px", top: 955 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 715 + "px", top: 958 + "px", width: 209 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 710 + "px", top: 959 + "px", width: 216 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 378 + "px", top: 960 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 350 + "px", width: 214 + "px", height: 161 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 12) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 377 + "px", top: 346 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 704 + "px", top: 955 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8lb.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 374 + "px", top: 955 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 715 + "px", top: 958 + "px", width: 209 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 710 + "px", top: 959 + "px", width: 216 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-displayedGear').css({ left: 378 + "px", top: 960 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
					} else if (data.truck.forwardGears === 12) {
						$('.truck-displayedGear').css({ left: 711 + "px", top: 350 + "px", width: 214 + "px", height: 161 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
					}
				}
			}
			if (data.truck.nextGear === 12) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 377 + "px", top: 346 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 704 + "px", top: 955 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 374 + "px", top: 955 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 715 + "px", top: 958 + "px", width: 209 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 715 + "px", top: 345 + "px", width: 209 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 710 + "px", top: 959 + "px", width: 216 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "mack" || data.truck.id === "volvo") {
					if (data.truck.forwardGears === 14) {
						$('.truck-nextGear').css({ left: 378 + "px", top: 960 + "px", width: 213 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/5hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 12) {
						$('.truck-nextGear').css({ left: 711 + "px", top: 350 + "px", width: 214 + "px", height: 161 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 13) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 374 + "px", top: 958 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
					} else if (data.truck.forwardGears === 13) {
						$('.truck-displayedGear').css({ left: 704 + "px", top: 955 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8hb.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 708 + "px", top: 345 + "px", width: 216 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7lb.png")' });
					}
				}
				if (data.truck.id === "scania") {
					$('.truck-displayedGear').css({ left: 710 + "px", top: 959 + "px", width: 216 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
				}
				if ((data.truck.id === "mack" || data.truck.id === "volvo") && data.truck.forwardGears === 14) {
					$('.truck-displayedGear').css({ left: 711 + "px", top: 350 + "px", width: 214 + "px", height: 161 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
				}
			}
			if (data.truck.nextGear === 13) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 374 + "px", top: 958 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					} else if (data.truck.forwardGears === 13) {
						$('.truck-nextGear').css({ left: 704 + "px", top: 955 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 708 + "px", top: 345 + "px", width: 216 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					$('.truck-nextGear').css({ left: 710 + "px", top: 959 + "px", width: 216 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
					$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
				}
				if ((data.truck.id === "mack" || data.truck.id === "volvo") && data.truck.forwardGears === 14) {
					$('.truck-nextGear').css({ left: 711 + "px", top: 350 + "px", width: 214 + "px", height: 161 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6lb.png")' });
					$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
				}
			}
			if (data.truck.gear === 14) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 374 + "px", top: 958 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 708 + "px", top: 345 + "px", width: 216 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7hb.png")' });
					}
				}
				if (data.truck.id === "scania") {
					$('.truck-displayedGear').css({ left: 710 + "px", top: 959 + "px", width: 216 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
				}
				if ((data.truck.id === "mack" || data.truck.id === "volvo") && data.truck.forwardGears === 14) {
					$('.truck-displayedGear').css({ left: 711 + "px", top: 350 + "px", width: 214 + "px", height: 161 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
				}
			}
			if (data.truck.nextGear === 14) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 374 + "px", top: 958 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 708 + "px", top: 345 + "px", width: 216 + "px", height: 168 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "scania") {
					$('.truck-nextGear').css({ left: 710 + "px", top: 959 + "px", width: 216 + "px", height: 165 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
					$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
				}
				if ((data.truck.id === "mack" || data.truck.id === "volvo") && data.truck.forwardGears === 14) {
					$('.truck-nextGear').css({ left: 711 + "px", top: 350 + "px", width: 214 + "px", height: 161 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/6hb.png")' });
					$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
				}
			}
			if (data.truck.gear === 15) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 708 + "px", top: 345 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7lb.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 704 + "px", top: 958 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8lb.png")' });
					}
				}
			}
			if (data.truck.nextGear === 15) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 708 + "px", top: 345 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 704 + "px", top: 958 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8lb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 16) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-displayedGear').css({ left: 708 + "px", top: 345 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7hb.png")' });
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-displayedGear').css({ left: 704 + "px", top: 958 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8hb.png")' });
					}
				}
			}
			if (data.truck.nextGear === 16) {
				if (data.truck.id === "freightliner" || data.truck.id === "international" || data.truck.id === "kenworth" || data.truck.id === "mack" || data.truck.id === "peterbilt" || data.truck.id === "volvo" || data.truck.id === "westernstar") {
					if (data.truck.forwardGears === 18) {
						$('.truck-nextGear').css({ left: 708 + "px", top: 345 + "px", width: 216 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/7hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
				if (data.truck.id === "daf" || data.truck.id === "iveco" || data.truck.id === "man" || data.truck.id === "mercedes" || data.truck.id === "renault") {
					if (data.truck.forwardGears === 16) {
						$('.truck-nextGear').css({ left: 704 + "px", top: 958 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8hb.png")' });
						$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
					}
				}
			}
			if (data.truck.gear === 17) {
				$('.truck-displayedGear').css({ left: 704 + "px", top: 958 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8lb.png")' });
			}
			if (data.truck.nextGear === 17) {
				$('.truck-nextGear').css({ left: 704 + "px", top: 958 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8lb.png")' });
				$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
			}
			if (data.truck.gear === 18 && data.truck.forwardGears === 18) {
				$('.truck-displayedGear').css({ left: 704 + "px", top: 958 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8hb.png")' });
			}
			if (data.truck.nextGear === 18) {
				$('.truck-nextGear').css({ left: 704 + "px", top: 958 + "px", width: 220 + "px", height: 169 + "px", position: "absolute", zIndex: 3, backgroundImage: 'url("../skins/18speed/images/8hb.png")' });
				$('.truck-nextGear').css('animation', 'blinker 0.8s linear infinite');
			}
		} else if (data.truck.shifterType === "automatic" || data.truck.shifterType === "arcade") {
			$('.truck-displayedGear').css({ left: 193 + "px", top: 943 + "px", width: 210 + "px", height: 210 + "px", position: "absolute", zIndex: 4, backgroundImage: 'url("../skins/18speed/images/gearhighlight.png")' });
		}
	}

	if (data.truck.fuel > 0) {
		var fC = data.truck.fuelCapacity;
		var fu = data.truck.fuel;
		var fWF = data.truck.fuelWarningFactor;
		if (fu >= fC - 0.02) {
			resetTripA();
		}
		$('.truck-fuelWarningOn').css('backgroundColor', 'red');
		if (data.truck.fuel <= (fC * fWF)) {
			$('.truck-fuelWarningOn').css('animation', 'myreserve 1s linear infinite');
		} else if (fu <= fC * 0.5 && fu > fC * 0.25) {
			$('.truck-fuelWarningOn').css('backgroundColor', 'orange');
			$('.truck-fuelWarningOn').css('animation', 'myreserve 0s infinite');
		} else if (fu <= fC * 0.75 && fu > fC * 0.5) {
			$('.truck-fuelWarningOn').css('backgroundColor', 'yellow');
			$('.truck-fuelWarningOn').css('animation', 'myreserve 0s infinite');
		} else if (fu > fC * 0.75) {
			$('.truck-fuelWarningOn').css('backgroundColor', 'green');
			$('.truck-fuelWarningOn').css('animation', 'myreserve 0s infinite');
		}
	} else if (fu === 0 || data.truck.electricOn) {
		$('.truck-fuelWarningOn').css('backgroundColor', 'red');
		$('.truck-fuelWarningOn').css('animation', 'myreserve 1s infinite');
	}

	return data;
};

function myFunctionA(value, index, array) {
	if (gr >= 0 && spd >= 0) {
		return value >= spd;
	} else if (gr <= 0 && spd < 0) {
		return value >= Math.abs(spd);
	}
};

var slideIndex = 1;
	showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
	showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides(slideIndex = n);
}

// Open the Modal
function openModal() {
	document.getElementById("myModal").style.display = "block";
	document.getElementById("myModal").style.left = "0px"; 
	document.getElementById("myModal").style.top = "0px"; 
	document.getElementById("myModal").style.height = "1352px"; 
	document.getElementById("myModal").style.width = "2381px"; 
	document.getElementById("myModal").style.overflow = "show";
}

// Close the Modal
function closeModal() {
	document.getElementById("myModal").style.display = "none";
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("demo");
	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex-1].style.display = "block";
}

/* Open when someone clicks on the span element */
function syncDiff() {
	var job = document.getElementById("jobM").innerHTML;
	var GameN = document.getElementById("name-game").innerHTML;
	var LastDiff = GameN + "LastDiffRat";
	var str = document.getElementById("make").innerHTML;
	var cut = str.slice(0, 3);
	var diff = localStorage.getItem(LastDiff) * 100;
	var myID =  cut + document.getElementById("model").innerHTML + document.getElementById("fWg").innerHTML + document.getElementById("rVg").innerHTML + diff;
	var myTruck = cut + document.getElementById("model").innerHTML;
	var D_RatioID =  myID + "D_Ratio";
	var fG_RatioID = myID + "fG_Ratio";
	var firstID = myID + "first";
	var T_DiaID = myTruck + "T_Dia";
	var spd = document.getElementById("spd").innerHTML;
	if (job !== "quick_job") {
		if (localStorage.getItem(firstID) > 0) {
			first_gear.value = localStorage.getItem(firstID);
		} else {
			first_gear.value = "";
		}

		if (localStorage.getItem(D_RatioID) > 0) {
			curD_Ratio.value = localStorage.getItem(D_RatioID);
		} else {
			curD_Ratio.value = "";
		}

		document.getElementById("myDiff").style.left = "840px"; 
		document.getElementById("myDiff").style.top = "25px"; 
		document.getElementById("myDiff").style.height = "550px"; 
		document.getElementById("myDiff").style.width = "750px"; 
		document.getElementById("myDiff").style.overflow = "show";
		localStorage.setItem("syncDiffOpen", 1);
	} else {
		document.getElementById("errMessage").innerHTML = "GearMaster can not be used on THIS TRUCK while on a QUICK JOB!!";
		openErr();
	}
}

function syncGears() {
	document.getElementById("myGears").style.left = "800px"; 
	document.getElementById("myGears").style.top = "25px"; 
	document.getElementById("myGears").style.height = "650px"; 
	document.getElementById("myGears").style.width = "950px"; 
	document.getElementById("myGears").style.overflow = "show";
}

function openErr() {
	document.getElementById("myErr").style.left = "800px"; 
	document.getElementById("myErr").style.top = "525px"; 
	document.getElementById("myErr").style.height = "590px"; 
	document.getElementById("myErr").style.width = "950px"; 
	document.getElementById("myErr").style.overflow = "show";
}

function closeErr() {
	document.getElementById("myErr").style.left = "0px"; 
	document.getElementById("myErr").style.top = "0px"; 
	document.getElementById("myErr").style.height = "0px"; 
	document.getElementById("myErr").style.width = "0px"; 
	document.getElementById("myErr").style.overflow = "hidden";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeDiff() {
	document.getElementById("myDiff").style.left = "0px"; 
	document.getElementById("myDiff").style.top = "0px"; 
	document.getElementById("myDiff").style.height = "0px"; 
	document.getElementById("myDiff").style.width = "0px"; 
	document.getElementById("myDiff").style.overflow = "hidden";
	localStorage.setItem("syncDiffOpen", 0);
}

function closeGears() {
	document.getElementById("myGears").style.left = "0px"; 
	document.getElementById("myGears").style.top = "0px"; 
	document.getElementById("myGears").style.height = "0px"; 
	document.getElementById("myGears").style.width = "0px"; 
	document.getElementById("myGears").style.overflow = "hidden";
}

function changeDis(dispId, dispValue) {
	var dispId = "showId";
	if (localStorage.showId === "Kph") {
		var dispValue = "Mph";
		localStorage.setItem(dispId, dispValue);
	} else if (localStorage.showId === "Mph") {
		var dispValue = "Kph";
		localStorage.setItem(dispId, dispValue);
	}
	if (localStorage.showId === undefined) {
		var dispValue = "Kph";
		localStorage.setItem(dispId, dispValue);
	} else if (localStorage.showId === "Kph" || localStorage.showId === "Mph") {
		var dispValue = localStorage.showId.value;
	}
}

function ReSetD_Ratio() {
	var str = document.getElementById("make").innerHTML;
	var cut = str.slice(0, 3);
	var diff = (document.getElementById("curD_Ratio").value * 100).toFixed(0);
	var myID =  cut + document.getElementById("model").innerHTML + document.getElementById("fWg").innerHTML + document.getElementById("rVg").innerHTML + diff;
	var myTruck = cut + document.getElementById("model").innerHTML;
	var D_RatioID =  myID + "D_Ratio";
	var fG_RatioID = myID + "fG_Ratio";
	var rG_RatioID = myID + "rG_Ratio";
	var fSpd_DevId = myID + "fSpd_Dev";
	var rSpd_DevId = myID + "rSpd_Dev";
	var fMxSpdId = myID + "fMxSpd";
	var rMxSpdId = myID + "rMxSpd";
	var firstID = myID + "first";
	var T_DiaID = myTruck + "T_Dia";
		localStorage.removeItem(D_RatioID);
		localStorage.removeItem(fG_RatioID);
		localStorage.removeItem(rG_RatioID);
		localStorage.removeItem(fSpd_DevId);
		localStorage.removeItem(rSpd_DevId);
		localStorage.removeItem(fMxSpdId);
		localStorage.removeItem(rMxSpdId);
		localStorage.removeItem(firstID);
		localStorage.removeItem(T_DiaID);
		localStorage.setItem("fSet", 0);
		localStorage.setItem("rSet", 0);
		localStorage.setItem("fi", 1);
		localStorage.setItem("ri", 1);
	document.getElementById("diffChange").innerHTML = "Settings Cleared!";
}	

function SetD_Ratio(D_RatioID, D_RatioValue) {
	// localStorage.clear()
	localStorage.setItem("syncDiffOpen", 0);
	var GameN = document.getElementById("name-game").innerHTML;
	var LastDiff = GameN + "LastDiffRat";
	var str = document.getElementById("make").innerHTML;
	var cut = str.slice(0, 3);
	var diff = (document.getElementById("curD_Ratio").value * 100).toFixed(0);
	var first = (document.getElementById("first_gear").value);
	var myID =  cut + document.getElementById("model").innerHTML + document.getElementById("fWg").innerHTML + document.getElementById("rVg").innerHTML + diff;
	var myTruck = cut + document.getElementById("model").innerHTML;
	var D_RatioID =  myID + "D_Ratio";
	var fG_RatioID = myID + "fG_Ratio";
	var rG_RatioID = myID + "rG_Ratio";
	var fSpd_DevId = myID + "fSpd_Dev";
	var rSpd_DevId = myID + "rSpd_Dev";
	var fMxSpdId = myID + "fMxSpd";
	var rMxSpdId = myID + "rMxSpd";
	var firstID = myID + "first";
	var T_DiaID = myTruck + "T_Dia";

	if (document.getElementById("first_gear").value !== localStorage.getItem(firstID)) {
		var firstValue = document.getElementById("first_gear").value;
	} else if (localStorage.getItem(firstID) > 0) {
		document.getElementById("first_gear").value === localStorage.getItem(firstID);
	}

	if (document.getElementById("curD_Ratio").value !== localStorage.getItem(D_RatioID)) {
		var D_RatioValue = document.getElementById("curD_Ratio").value;
	} else if (localStorage.getItem(D_RatioID) > 0) {
		D_RatioValue = document.getElementById("curD_Ratio").value;
		document.getElementById("curD_Ratio").value === localStorage.getItem(D_RatioID);
	}

	if (localStorage.getItem(D_RatioID) === null || localStorage.getItem(D_RatioID) !== document.getElementById("curD_Ratio").value || localStorage.getItem(fG_RatioID) === undefined) {
		localStorage.removeItem(D_RatioID);
		localStorage.removeItem(fG_RatioID);
		localStorage.removeItem(rG_RatioID);
		localStorage.removeItem(fSpd_DevId);
		localStorage.removeItem(rSpd_DevId);
		localStorage.removeItem(fMxSpdId);
		localStorage.removeItem(rMxSpdId);
		localStorage.removeItem(firstID);
		localStorage.removeItem(T_DiaID);
		localStorage.removeItem("fi");
		localStorage.removeItem("ri");
		localStorage.setItem(firstID, firstValue);
		localStorage.setItem(LastDiff, D_RatioValue);
		localStorage.setItem(D_RatioID, D_RatioValue);
		localStorage.setItem(fG_RatioID, '');
		localStorage.setItem(rG_RatioID, '');
		localStorage.setItem(fMxSpdId, '');
		localStorage.setItem(rMxSpdId, '');
		localStorage.setItem("fSet", 0);
		localStorage.setItem("rSet", 0);
		localStorage.setItem("fi", 1);
		localStorage.setItem("ri", 1);
		document.getElementById("diffChange").innerHTML = "New Settings Created!";
		closeDiff();
		syncGears();
	} else { 
		localStorage.setItem(LastDiff, D_RatioValue);
		closeDiff();
		document.getElementById("diffChange").innerHTML = "Current Settings!";
	}
}


function SetfG_Ratio(fG_RatioID, fG_RatioValue) {
	localStorage.setItem(fG_RatioID, fG_RatioValue);
}
	
function SetfSpd_Dev(fSpd_DevId, fSpd_DevValue) {
	localStorage.setItem(fSpd_DevId, fSpd_DevValue);
}

function SetfMxSpd(fMxSpdId, fMxSpdValue) {
	localStorage.setItem(fMxSpdId, fMxSpdValue);
}
function SetrG_Ratio(rG_RatioID, rG_RatioValue) {
	localStorage.setItem(rG_RatioID, rG_RatioValue);
}
	
function SetrSpd_Dev(rSpd_DevId, rSpd_DevValue) {
	localStorage.setItem(rSpd_DevId, rSpd_DevValue);
}

function SetrMxSpd(rMxSpdId, rMxSpdValue) {
	localStorage.setItem(rMxSpdId, rMxSpdValue);
}

function work_stat(dispStat, statValue) {
	dispStat = "workStat";
	if (jobS === "empty" || jobS === "gotJob") {
		statValue = "offDuty";
	} else if (jobS === "loaded") {
		statValue = "onDuty";
	}
	localStorage.setItem(dispStat, statValue);
}

function resetTripA(tripID, tripValue){
	var str = document.getElementById("make").innerHTML;
	var cut = str.slice(0, 3);
	var tripID = document.getElementById("name-game").innerHTML + "tripA" + cut + document.getElementById("model").innerHTML;
	var tripValue = document.getElementById("trip-start").innerHTML;
	localStorage.setItem(tripID, tripValue);
}

function resetTripB(tripID, tripValue) {
	var str = document.getElementById("make").innerHTML;
	var cut = str.slice(0, 3);
	var tripID = document.getElementById("name-game").innerHTML +"tripB" + cut + document.getElementById("model").innerHTML ;
	var tripValue = document.getElementById("trip-start").innerHTML;
	localStorage.setItem(tripID, tripValue);
}

function resetMass(loadID, loadMass) {
	var str = document.getElementById("make").innerHTML;
	var cut = str.slice(0, 3);
	var loadID = cut + document.getElementById("model").innerHTML ;
	var loadMass = document.getElementById("trip-mass").innerHTML;
	localStorage.setItem(loadID, loadMass);
}
