// const fuzzylogic = require('fuzzylogic'),
//     rules = require('fuzzylogic/lib/rules.js'),
//     util = require('util'),
//     assert = require('assert')
var fuzzification=function(value){
    var cut1=[0,0];
    var names=["",""];
    var i=0;
    if (value>=0 && value<=200) {
        cut1[i]=(200-value)/200;
        names[i]="vla";
        i=i+1;
    }
    if(value>=100 && value<=200){
        cut1[i]=(value-100)/100;
        names[i]="la";
        i=i+1;
    }
    if (value>=200 && value<=400) {
        cut1[i]=(400-value)/200;
        names[i]="la";
        i=i+1
    }
    if (value>=200 && value<=400) {
        cut1[i]=(value-200)/200;
        names[i]="ma";
        i=i+1;
    }
    if (value>=400 && value<=600) {
        cut1[i]=(600-value)/200;
        names[i]="ma";
        i=i+1;
    }
    if (value>=400 && value<=600) {
        cut1[i]=(value-400)/200;
        names[i]="ha";
        i=i+1;
    }
    if (value>=600 && value<=800) {
        cut1[i]=(800-value)/200;
        names[i]="ha";
        i=i+1;
    }
    if (value>=600 && value<=800) {
        cut1[i]=(value-600)/200;
        names[i]="vha";
        i=i+1;
    }
    if (value>=800) {
        cut1[i]=1;
        names[i]="vha";
        i=i+1;
    }

    var maxValue=rules.or(cut1[0], cut1[1], function(va){}, function(va){});
    var activity=undefined;
    if (maxValue==cut1[0]) {
        activity=names[0];
    }
    else{
        activity=names[1];
    }

    var ret={
                "value":maxValue,
                "activity":activity
            };
    return ret;
}

var defzzification=function(ret){
    var activity=ret.activity;
    var value=ret.value;
    if (activity.localeCompare("vla")==0) {
        //it is mapped to spal
        var temp1= value*0.2+1;
        var temp2=1.375-value*0.175;
        return (temp1+temp2)/2;
    }
    if (activity.localeCompare("la")==0) {
        //it is mapped to lpal
        var temp1= value*0.175+1.2;
        var temp2=1.55-value*0.175;
        return (temp1+temp2)/2;

    }
    if (activity.localeCompare("ma")==0) {
        //it is mapped to apal
        var temp1= value*0.175+1.375;
        var temp2=1.725-value*0.175;
        return (temp1+temp2)/2;
    }
    if (activity.localeCompare("ha")==0) {
        //it is mapped to hpal
        var temp1= value*0.175+1.55;
        var temp2=1.9-value*0.175;
        return (temp1+temp2)/2;
    }
    if (activity.localeCompare("vha")==0) {
        //it is vhpal
        var temp1= value*0.175+1.725;
        return temp1;
    }
}

var AANFuzzyLogic= function(value){
    var y=fuzzification(value);
    var z=defzzification(y);
    return z;
}

function fuzzy() {
    var BMR2 = 1,
        BMR = 0
    this.fuzzify = function(BMR1,user) {
         // console.log(user.profile.activity);

        switch (user.profile.activity) {
            case 'NA':
                BMR2 = 1.2
                break;
            case 'LA':
                BMR2 = 1.375
                break;
            case 'MA':
                BMR2 = 1.55
                break;
            case 'HA':
                BMR2 = 1.725
                break;
            case 'VHA':
                BMR2 = 1.9
                break;
            default:
                console.log("Error in calculating BMR2");
        }
        return BMR = BMR1 * BMR2
    }
}
module.exports = fuzzy