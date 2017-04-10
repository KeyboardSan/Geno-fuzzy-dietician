const RawFood = require('./../../models/RawFood')
const UserDiet = require('./../../models/UserDiet')
var _ = require('lodash')

function genetic(user, ethnicity, res, params, session) {
    // Encoding structure of chromosomes
    function chromosome() {
        this.eb = {

        }
        this.b = {

        }
        this.l = {

        }
        this.s = {

        }
        this.d = {

        }
    }
    this.calculate = function() {
        var diet;
        var gobalERR = Infinity
        var globalChromo;
        // Fetching raw food after removing the diesases, allergies and segregating as per veg/non veg and prefered ethnicity

        // console.log(user)
        if(!session.dislike)
        {
            session.dislike=[]
        }

        var segregatingArray = {
            'eb': [],
            'b': [],
            'l': [],
            's': [],
            'd': []
        }


        RawFood.find({
            $and: [{
                'diseases': {
                    $nin: user.profile.diseases
                }
            }, {
                'allergies': {
                    $nin: user.profile.allergies
                }
            }, {
                'foodpref': user.profile.foodpref
            }, {
                '_id': {
                    $nin: session.dislike[0]
                }
            }]
        }, function(err, foods) {

            foods.forEach(function(foodItem) {
                foodItem.time.forEach(function(a) {
                        segregatingArray[a].push(foodItem)
                    })
                    // console.log(it);
            })

            // console.log(" segregatingArray total food count "+ (segregatingArray['eb'].length+segregatingArray['b'].length+segregatingArray['l'].length+segregatingArray['s'].length+segregatingArray['d'].length) )

            // finding out the max length from all the segregatingArrays and that will decide the number of chromosomes.

            var numberOfChromosomes = 0
            var max = 0
            var timeLengths = {}
            for (var key in segregatingArray) {
                timeLengths[key] = segregatingArray[key].length
                if (max < timeLengths[key]) {
                    max = timeLengths[key]
                }
            }
            // console.log("All the lengths of segregatingArrays"+timeLengths)
            // console.log("The max is "+max)

            // Encoding process starts here.
            var pool = []
            for (var i = 0; i < max; i++) {
                var temp = new chromosome()
                temp.eb = segregatingArray['eb'][(i % timeLengths['eb'])]
                temp.b = segregatingArray['b'][(i % timeLengths['b'])]
                temp.l = segregatingArray['l'][(i % timeLengths['l'])]
                temp.s = segregatingArray['s'][(i % timeLengths['s'])]
                temp.d = segregatingArray['d'][(i % timeLengths['d'])]
                    // console.log(temp);
                pool.push(temp)
            }
            // console.log("Pool length is" + pool.length)
            // console.log(pool[0])

            // calculating basic stuff of chromosome and it`s parameters

            pool.forEach(function(chromo) {
                var TF = 0,
                    TP = 0,
                    TCC = 0,
                    TCal = 0
                for (var a in chromo) {
                    // console.log(chromo[a]);
                    TF = TF + chromo[a].fats
                    TP = TP + chromo[a].protein
                    TCC = TCC + chromo[a].carbohydrates
                    TCal = TCal + Number(chromo[a].calories)
                }
                chromo.TF = TF
                chromo.TP = TP
                chromo.TCC = TCC
                chromo.TC = TCal
                chromo.used = false
                chromo.err = Math.abs(chromo.TF - user.profile.TF) + Math.abs(chromo.TC - user.profile.TC) + Math.abs(chromo.TP - user.profile.TP) + Math.abs(chromo.TCC - user.profile.TC)
                chromo._id = Date.now()

                if (gobalERR > chromo.err) {
                    gobalERR = chromo.err
                    globalChromo=chromo
                }

                // /**/  console.log(chromo)
                // console.log(" "+TF+" "+TP+" "+TCC);
            })

            // console.log("Pool length before removing" + pool.length)

            //cleaning the pool which are greater than the required TC
            _.remove(pool, function(chromo) {

                return result = chromo.TF > user.profile.TF || chromo.TC > user.profile.TC || chromo.TP > user.profile.TP || chromo.TCC > user.profile.TC
            })

            // console.log("Pool length after removing" + pool.length)
            

            var workingPool = []
            var count = 0

            do {

                // Rank selection based on error btw all.

                // New Selection method starts here
                // Fetching 20 random chromosomes chromosomes.

                for (var i = 0; i < 20 - workingPool.length; i++) {
                    //search from pool based on minimum err criteria from initial pool
                    // var temp = _.minBy(pool, function(chromo) {
                    //     return chromo.err
                    // });

                    // pick random 20 chromosomes 
                    var randomIndex = _.random(0, pool.length)
                    if (pool[randomIndex]) {
                        var temp = _.remove(pool, pool[randomIndex])
                            // append in new pool of top20frompool
                        workingPool = workingPool.concat(temp)

                    }

                }

                // Keeping top 10 and removing the remaining 10 


                for (var i = 0; i < workingPool.length / 2; i++) {

                    var temp = _.maxBy(workingPool, function(chromo) {
                        return chromo.err
                    });

                    _.remove(workingPool, temp)

                }
                _.sortBy(workingPool,function(chromo){
                    return chromo.err
                })
                // start cross over of 10 elements
                var childPool = []
                var len = 0
                if (workingPool.length % 2 == 0) {
                    len = workingPool.length
                } else {
                    len = workingPool.length - 1
                }
                for (var i = 0; i < len; i = i + 2) {

                    var child1 = new chromosome()
                    var child2 = new chromosome()
                        // starting cross over
                        // single point cross over at lunch
                        // configuration of child1
                    child1.eb = workingPool[i].eb
                    child1.b = workingPool[i].b
                    child1.l = workingPool[i].l
                    child1.s = workingPool[i + 1].s
                    child1.d = workingPool[i + 1].d

                    // configuration of child2

                    child2.eb = workingPool[i + 1].eb
                    child2.b = workingPool[i + 1].b
                    child2.l = workingPool[i + 1].l
                    child2.s = workingPool[i].s
                    child2.d = workingPool[i].d

                    childPool.push(child1)
                    childPool.push(child2)

                }

                childPool.forEach(function(chromo) {
                    var TF = 0,
                        TP = 0,
                        TCC = 0,
                        TCal = 0
                    for (var a in chromo) {
                        // console.log(chromo[a]);
                        TF = TF + chromo[a].fats
                        TP = TP + chromo[a].protein
                        TCC = TCC + chromo[a].carbohydrates
                        TCal = TCal + Number(chromo[a].calories)
                    }
                    chromo.TF = TF
                    chromo.TP = TP
                    chromo.TCC = TCC
                    chromo.TC = TCal
                    chromo.used = false
                    chromo.err = Math.abs(chromo.TF - user.profile.TF) + Math.abs(chromo.TC - user.profile.TC) + Math.abs(chromo.TP - user.profile.TP) + Math.abs(chromo.TCC - user.profile.TCC)
                    chromo._id = Date.now()
                    if (gobalERR > chromo.err) {
                        gobalERR = chromo.err
                        globalChromo=chromo
                    }
                })

                if (childPool.length != 0) {
                    workingPool = workingPool.concat(childPool)

                    for (var i = 0; i < workingPool.length / 2; i++) {

                        var temp = _.maxBy(workingPool, function(chromo) {
                            return chromo.err
                        });

                        _.remove(workingPool, temp)

                    }

                }
                // for (var i = 0; i < 10; i++) {
                // 	console.log(workingPool[i].err +" "+ childPool[i].err)
                // 	}

                console.log("Iteration " + count)
                count = count + 1

            } while (pool.length != 0);

            //final working Pool.
            // console.log(workingPool)

            console.log("The best solution is ")
            min = _.minBy(workingPool, function(chromo) {
                return chromo.err
            });
            console.log(gobalERR)
            console.log(min)
            console.log("The global chormo is")
            console.log(globalChromo)

            min=globalChromo

            UserDiet.find({
                userId: user._id
            }, function(err, usr) {
                if (usr.length == 0) {
                    usrDiet = new UserDiet({
                        userId: user._id,
                        current: {
                            date: new Date(),
                            TotalFat: min.TF,
                            TotalCarbohydrates: min.TCC,
                            TotalProtein: min.TP,
                            TotalCalorie: min.TC,
                            d: {
                                _id: min.d._id,
                                name: min.d.name,
                                calories: min.d.calories,
                                protein: min.d.protein,
                                carbohydrates: min.d.carbohydrates,
                                fats: min.d.fats,
                                sugar: min.d.sugar,
                                sodium: min.d.sodium
                            },
                            eb: {
                                _id: min.eb._id,
                                name: min.eb.name,
                                calories: min.eb.calories,
                                protein: min.eb.protein,
                                carbohydrates: min.eb.carbohydrates,
                                fats: min.eb.fats,
                                sugar: min.eb.sugar,
                                sodium: min.eb.sodium
                            },

                            b: {
                                _id: min.b._id,
                                name: min.b.name,
                                calories: min.b.calories,
                                protein: min.b.protein,
                                carbohydrates: min.b.carbohydrates,
                                fats: min.b.fats,
                                sugar: min.b.sugar,
                                sodium: min.b.sodium
                            },

                            l: {
                                _id: min.l._id,
                                name: min.l.name,
                                calories: min.l.calories,
                                protein: min.l.protein,
                                carbohydrates: min.l.carbohydrates,
                                fats: min.l.fats,
                                sugar: min.l.sugar,
                                sodium: min.l.sodium
                            },

                            s: {
                                _id: min.d._id,
                                name: min.s.name,
                                calories: min.s.calories,
                                protein: min.l.protein,
                                carbohydrates: min.s.carbohydrates,
                                fats: min.s.fats,
                                sugar: min.s.sugar,
                                sodium: min.s.sodium
                            },
                            params: {
                                height: params.height,
                                weight: params.weight,
                                age: params.age,
                                ethnicity: ethnicity
                            }

                        }
                    })
                    usrDiet.save(function(err, done) {
                        console.log("User Diet Saved")
                        res.redirect('/viewdiet');
                    });
                } else {

                    UserDiet.findOneAndUpdate({
                        userId: user._id
                    }, {
                        $push: {
                            history: usr[0].current
                        },
                        $set: {

                            current: {
                                date: new Date(),
                                TotalFat: min.TF,
                                TotalCarbohydrates: min.TCC,
                                TotalProtein: min.TP,
                                TotalCalorie: min.TC,
                                d: {
                                    _id: min.d._id,
                                    name: min.d.name,
                                    calories: min.d.calories,
                                    protein: min.d.protein,
                                    carbohydrates: min.d.carbohydrates,
                                    fats: min.d.fats,
                                    sugar: min.d.sugar,
                                    sodium: min.d.sodium
                                },
                                eb: {
                                    _id: min.eb._id,
                                    name: min.eb.name,
                                    calories: min.eb.calories,
                                    protein: min.eb.protein,
                                    carbohydrates: min.eb.carbohydrates,
                                    fats: min.eb.fats,
                                    sugar: min.eb.sugar,
                                    sodium: min.eb.sodium
                                },

                                b: {
                                    _id: min.b._id,
                                    name: min.b.name,
                                    calories: min.b.calories,
                                    protein: min.b.protein,
                                    carbohydrates: min.b.carbohydrates,
                                    fats: min.b.fats,
                                    sugar: min.b.sugar,
                                    sodium: min.b.sodium
                                },

                                l: {
                                    _id: min.l._id,
                                    name: min.l.name,
                                    calories: min.l.calories,
                                    protein: min.l.protein,
                                    carbohydrates: min.l.carbohydrates,
                                    fats: min.l.fats,
                                    sugar: min.l.sugar,
                                    sodium: min.l.sodium
                                },

                                s: {
                                    _id: min.s._id,
                                    name: min.s.name,
                                    calories: min.s.calories,
                                    protein: min.l.protein,
                                    carbohydrates: min.s.carbohydrates,
                                    fats: min.s.fats,
                                    sugar: min.s.sugar,
                                    sodium: min.s.sodium
                                },
                                params: {
                                    height: params.height,
                                    weight: params.weight,
                                    age: params.age,
                                    ethnicity: ethnicity
                                }

                            }

                        }
                    }, function(err, model) {
                        if (err) {
                            console.log(err)
                        }
                        res.redirect('/viewdiet')

                    })


                }


            })

        });

    }




}

module.exports = genetic