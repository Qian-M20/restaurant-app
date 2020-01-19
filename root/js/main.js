/* jslint browser: true */
/* global $, TweenMax,Power4,Power1, alert, */

// hide all screens and section divs
//display:none
$("main,section").hide();

// SPLASH SCREEN //////////////////////////////////////////////
$("#splash").show();

// three primeters -- target, duration, property

TweenMax.from("#splash",.5, {
    delay:0.25,
    opacity:0     
});

// TweenMax.from("#splash header", .5, {
//     delay:0.5,
// //    "outerheight" takes care of the consideration of any border
//     y:-$("#splash header").outerHeight(),
// //    power4 is a good animation, no need to change it
//     ease: Power4.easeOut
// })

// TweenMax.from("#splash footer", .5, {
//     delay:0.5,
//     y:$("#splash footer").outerHeight(),
//     ease: Power4.easeOut
// })

TweenMax.from("#splash img", .5, {
    delay:1,
    scale:0,
    ease: Power4.easeOut
})

// this line of code hides the splash page, so TweenMax.to
TweenMax.to("#splash", 0.5, {
            delay:4,
            opacity:0,
            onComplete: loadlanding
});



// LANDING SCREEN ///////////////////////////////////////////
function loadlanding()
{
    
//    this line of code helps when hits the screen again, the opacity has been reset to 1
    $("main,section").hide().css({opacity:1});
    
    $("#landing").show();
    
    TweenMax.from("#landing",.5, {
        delay:0.25,
        opacity:0     
    });

    TweenMax.from("#landing header", .5, {
        delay:0.5,
    //    "outerheight" takes care of the consideration of any border
        y:-$("#landing header").outerHeight(),

    //    power4 is a good animation, no need to change it
        ease: Power4.easeOut
    })

    TweenMax.from("#landing footer", .5, {
        delay:0.5,
    //    "outerheight" takes care of the consideration of any border
        y:$("#landing footer").outerHeight(),

    //    power4 is a good animation, no need to change it
        ease: Power4.easeOut
    })
    
    //animate logo
    TweenMax.from("#logo1",0.5, {
        delay:1,
        opacity:0,
    //customize your own animation property, can not only do opacity, but also x-axis
        x:-500
    })
    TweenMax.from("#logo2",0.5, {
        delay:1.25,
        opacity:0,
    //customize your own animation property, can not only do opacity, but also x-axis
        x:500
    })
    TweenMax.from("#logo3",0.5, {
        delay:1.5,
        opacity:0,
    //customize your own animation property, can not only do opacity, but also x-axis
        x:-500
    })
    
    // set up logos to link to related restaurant
    // pass rest ID and subnav highlight colour to loadRest function
    // fade landing out and load selected restaurant
    $("#logo1").click(function(){
        TweenMax.to("#landing", 0.5, {
            opacity:0,
            onComplete: loadRest,
    //add parameters so that you know which restaurant you go to
            onCompleteParams:["#rest1", "#ec6f99"]
        });
    });
    
    
    $("#logo2").click(function(){
            TweenMax.to("#landing", 0.5, {
                opacity:0,
                onComplete: loadRest,
        //add parameters so that you know which restaurant you go to
                onCompleteParams:["#rest2", "#ec6941"]
            });
        });
    
    $("#logo3").click(function(){
            TweenMax.to("#landing", 0.5, {
                opacity:0,
                onComplete: loadRest,
        //add parameters so that you know which restaurant you go to
                onCompleteParams:["#rest3", "#097c25"]
            });
        });
}


// RESTAURANT SCREENS ///////////////////////////////////////////

function loadRest (restID, highlightColour)
{
    $("#landing").hide();
    
    $(restID).show();
    
    
//if you want to include a variable together with a string, this is how you should do it, alaways leave a space before the string    
    TweenMax.from(restID + " header", .5, {
        delay:0.25,
    //    "outerheight" takes care of the consideration of any border
        y:-$(restID + " header").outerHeight(),

    //    power4 is a good animation, no need to change it
        ease: Power4.easeOut
    });

    TweenMax.from(restID + " footer", .5, {
        delay:0.5,
    //    "outerheight" takes care of the consideration of any border
        y:$(restID + " footer").outerHeight(),

    //    power4 is a good animation, no need to change it
        ease: Power4.easeOut
    });
    
    $(restID +" .home").show ();
    
    $(restID +" .home").show().scrollTop(0);

    
    TweenMax.from(restID + " .home", 0.5, {
        delay:0.75,
        opacity:0
    });
    
// there has to be space between, parent, first child, grandchild 
// every class that has "reveal" on it would go through this loop 
// i means index, so during the loop, for each run, the delay time increases 0.25s
    $(restID + " .home .reveal").each(function(i){
        TweenMax.from(this, 0.5, {
            delay:1.25 + (i*0.25),
            opacity:0,
            scale:0,
            ease:Power4.easeout   
        });
        
    });
    
    //highlight home icon
    $(restID + " .homeIcon").css({background:highlightColour});
    
////////////////////////////////// set up icons to link to the related section
    var iconsTarget = restID+ " .homeIcon," +restID + " .specialsIcon,"+restID+" .reservationsIcon";
    

    $(iconsTarget).css({background: 'none'}).removeClass("active");
    
    // highlight home icon in footer on restaurant load
    $(".homeIcon").css({background: highlightColour}).addClass("active");
    
    // set up section nav - highlight and load section
    $(iconsTarget).click(function() {
        
    //if the icon that is clicked on is not active 
        if (!$(this).hasClass("active")) 
        {
            $(iconsTarget).css({background: 'none'}).removeClass("active");
            
            // add highlight to selected icon based on highlight colour
            $(this).css({background: highlightColour}).addClass("active");

            // load selected section - send current section and section to load
            loadSection(restID + " section", restID + " " + $(this).attr("data-section"));

            }

    });
}

// REUSABLE FUNCTIONS/CLICKS /////////////////////////////////////

// function for loading internal restaurant sections
function loadSection(prevSection, nextSection) {

    // fade out previous section
    TweenMax.to(prevSection, 0.5, {
        opacity: 0,
        onComplete: function() {
            // hide and reset previous section
            $(prevSection).hide().css({opacity: 1});
            // display next section and auto scroll to top of page
            $(nextSection).show().scrollTop(0);
        }
    });

    // animate on next section
    TweenMax.from(nextSection, 0.5, {
        delay: 0.5,
        opacity: 0
    });

    // loop through and reveal all elements on next screen with .reveal class applied
    $(nextSection + " .reveal").each(function(i) {

        TweenMax.from(this, 0.5, {
            delay:1.25 + (i*0.25),
            opacity:0,
            scale:0,
            ease:Power4.easeout   
        });

    });

}

// set up reservations submit button
$(".reserve").click(function(e) {
    
    // stops default processing for form
    e.preventDefault();
    
    alert("Reservations have been made."); // replace with reveal of actual content
    
});

// set up hamburger menu to reveal main menu
$('.hamburger').click(function(){
//    the attr is set up as a string
    if ($(this).attr("data-click-state")=="1")
    {
        $(this).attr("data-click-state","0");
        $(this).attr("src","img/hamburger2close.gif");
        $("#menu").show();
        $(".contactbox").hide();
        TweenMax.to(".rest", 0.5, {
            x:310,
            ease:Power1.easeOut
        });
    }
    else
    {
        $(this).attr("data-click-state","1");
        $(this).attr("src","img/close2hamburger.gif");
        TweenMax.to(".rest", 0.5, {
            x:0,
//            the sine.easeout has to be changed 
            ease:Power1.easeOut,
            onComplete:function(){
                $("#menu").hide();
            }
            
        });
        
    }
    
    
});

//// set up main menu links
//
//// go back to landing screen
//$("#backToLanding").click(function(){
//         $(".hamburger").attr("data-click-state","1");
//            $(".hamburger").attr("src","img/close2hamburger.gif");
//            TweenMax.to(".rest", 0.5, {
//                x:0,
//                ease:Circ.easeOut,
//                onComplete:function(){
//                    $("#menu").hide();
//                    TweenMax.to(".rest",0.5,{
//                        opacity:0,
//                        onComplete:loadlanding
//                    });
//     
//                }
//
//            });
//});

// set up main menu links
// go back to landing screen
$("#backToLanding").click(function() {

    // set button data state to active
    $(".hamburger").attr("data-click-state", 1);

    // change button image source to hamburger image
    $(".hamburger").attr("src", "img/close2hamburger.gif");

    // animate restaurant back, fade out and load landing screen
    TweenMax.to(".rest", 0.5, {
        x: 0,
        ease: Power4.easeOut,
        onComplete: function() {
            // hide menu
            $("#menu").hide();
            
            // fade out and go to landing screen
            TweenMax.to("main", 0.5, {
                opacity: 0,
                onComplete: loadlanding
            });

        }
    });

});

// reveal FoE about info      
$("#about").click(function(){
    
    alert("Please check the www.famiyofeateries.ca for more detailed information");
    
    $(".contactbox").hide();
    
});

// reveal FoE contact info      
$("#contact").click(function(){
        $(".contactbox").show();
        TweenMax.to(".contactbox", 0.5, {
        delay:0.25,
        opacity:1,
        ease:Power4.easeout  
    });
    
// there has to be space between, parent, first child, grandchild 
// every class that has "reveal" on it would go through this loop 
// i means index, so during the loop, for each run, the delay time increases 0.25s
    $(".reveal").each(function(i){
        TweenMax.from(this, 0.5, {
            delay:0.75 + (i*0.25),
            opacity:0,
            scale:0,
            ease:Power4.easeout   
        });
        
    });
    
});


// set up submit button
$(".submit").click(function(e) {
    
    // stops default processing for form
    e.preventDefault();
    
    alert("Thank you for your message!");
    // replace with reveal of actual content
    
});