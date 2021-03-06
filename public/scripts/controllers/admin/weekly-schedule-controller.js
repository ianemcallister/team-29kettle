ckc
    .controller('adminWeeklyScheduleController', adminWeeklyScheduleController);

	adminWeeklyScheduleController.$inject = ['$location', '$routeParams', 'moment', 'engagemnts'];

/* @ngInject */
function adminWeeklyScheduleController($location, $routeParams, moment, engagemnts) {

	//	NOTIFY PROGRES

	//	LOCAL VARIABLES
	var vm = this;

    //  LOCAL FUNCTIONS
    function consolidateChannelEngagments(allEngagments) {
        var channelsList = {};

        //  ITERATE OVER ALL ENGAGMENTS
        Object.keys(allEngagments).forEach(function(key) {

            //  LOOK FOR NEW CHANNEL IDS
            var channelId = allEngagments[key].channelId;
            if(channelsList[channelId] == undefined) {

                //  START NEW RECORD FOR NEW CHANNEL IDS
                channelsList[channelId] = {
                    channel: allEngagments[key].channel,
                    channelId: allEngagments[key].channelId,
                    engagments: [{},{},{},{},{},{},{}]
                }
            } 

            //  LOOK AT THE DATE - Sunday as 0, Saturday as 6
            var wkDay = 0;
            var engagmentDate = moment(allEngagments[key].date);
            //console.log(engagmentDate.day() - 1);
            if(engagmentDate.day() == 0) { wkDay = 6 } else { wkDay = engagmentDate.day() - 1; }

            channelsList[channelId].engagments[wkDay] = allEngagments[key];
            channelsList[channelId].engagments[wkDay]['engagmentId'] = key;

         
        })

        console.log('channels list: ', channelsList);

        return channelsList;
    }

	//	VIEW MODEL VARIABLES
    vm.currentWeek = ''
    vm.currentYear = '';
    vm.kitOrChannel = 'Channel';
    vm.days = '';
    vm.engagments = '';

    /*
    *   QUALITY CONTROL
    *
    */  
    
    //  Add Year and week if not present
    if(Object.keys($routeParams) < 1) {
        var Yr = moment().format("YY");
        var Wk = moment().week();
        var path = "admin/schedule/weekly\?Yr=" + Yr + "&&Wk=" + Wk;
        console.log(path);
        $location.url(path);
    }
    
    //  Validate wk and year variables
    if($routeParams.Wk != undefined) { vm.currentWeek = $routeParams.Wk; }
    if($routeParams.Yr != undefined) { vm.currentYear = 20 + $routeParams.Yr.toString(); }
    if($routeParams.Wk != undefined && $routeParams.Yr != undefined) {
        vm.days = {
            0: moment().year("20" + $routeParams.Yr).week($routeParams.Wk).isoWeekday("Monday").day(1).format(),
            1: moment().year("20" + $routeParams.Yr).week($routeParams.Wk).isoWeekday("Monday").day(2).format(),
            2: moment().year("20" + $routeParams.Yr).week($routeParams.Wk).isoWeekday("Monday").day(3).format(),
            3: moment().year("20" + $routeParams.Yr).week($routeParams.Wk).isoWeekday("Monday").day(4).format(),
            4: moment().year("20" + $routeParams.Yr).week($routeParams.Wk).isoWeekday("Monday").day(5).format(),
            5: moment().year("20" + $routeParams.Yr).week($routeParams.Wk).isoWeekday("Monday").day(6).format(),
            6: moment().year("20" + $routeParams.Yr).week($routeParams.Wk).isoWeekday("Monday").day(7).format(),
        }
    }
    if(engagemnts != undefined) { 
        vm.engagemnts = consolidateChannelEngagments(engagemnts); 
    }
    

	//	VIEW MODEL FUNCTIONS
    vm.leftArrow = function() {
        var Yr = parseInt($routeParams.Yr);
        var Wk = parseInt($routeParams.Wk);
        if(parseInt($routeParams.Wk) == 1) {
            Yr--;
            Wk = 52;
        } else {
            Wk--;
        }
        var path = "admin/schedule/weekly\?Yr=" + Yr + "&&Wk=" + Wk;
        $location.url(path);
    };

    vm.rightArrow = function() {
        var Yr = parseInt($routeParams.Yr);
        var Wk = parseInt($routeParams.Wk);
        if(parseInt($routeParams.Wk) == 52) {
            Yr++;
            Wk = 1;
        } else {
            Wk++;
        }
        var path = "admin/schedule/weekly\?Yr=" + Yr + "&&Wk=" + Wk;
        $location.url(path);
    };

	//	EXECUTE
	console.log('in the adminWeeklyScheduleController  controller ', $routeParams);	    //  TODO: TAKE THIS OUT LATER

    //  MAKE SURE THAT WE'RE USING A SPECIFIC WEEK

}
