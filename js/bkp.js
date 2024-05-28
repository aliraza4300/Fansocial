function scrollTracker() {
    
    let blur = 0;
    let opacity = 1.0
    let headerPos = -50;
    document.addEventListener('scroll', (e) => {
        let y = window.scrollY; /* get current page scroll position */


        /* 
         * Get main elements for the feature
         * overlay - black screen
         * img - blur section
         * banner section = where the carousel is located 
        */
        let overlay = document.querySelector('.overlay');
        let img = document.querySelector('.blur');
        let headerOverlay = document.querySelector('.banner-overlay');
        let header = document.querySelector('header');

        // Once hit 200px
        if(y < 200) {
            overlay.style = `opacity: 0`; /* force hide overlay */
            headerOverlay.style = `opacity: 0.5`; /* force display headerOverlay */


            // set blur property on css to 0
            document.documentElement.style.setProperty('--_blur', 0);
            header.style = `transform: translateY(-50px)`;
        }
        if(y >= 200) {
            //Once hit 200px calculate the black opacity and blur
            let colorPercent = (((1 - (img.clientHeight - y) / img.clientHeight) * 0.8) + 0.2).toFixed(2);
            let headerPercent = (((img.clientHeight - y) / img.clientHeight) - 0.2).toFixed(2);
            blur = (((1 - (img.clientHeight - y) / img.clientHeight) - 0.5));

            console.log(blur);

            //if the opacity achive the limit keep the number
            if(colorPercent >= .85) {
                colorPercent = .85;
            }
            // opacity adjustments
            opacity = opacity - colorPercent;

            //Set headerOverlay and overlay opacity and set blur
            overlay.style = `opacity: ${colorPercent}`;
            headerOverlay.style = `opacity: ${headerPercent - 0.45}`
            document.documentElement.style.setProperty('--_blur', `${blur}px`);
        }
        if(y > 600) {
            //Once hit 600 px set the max values
            overlay.style = `opacity: 0.85`;
            
            headerOverlay.style = `opacity: 0`
            document.documentElement.style.setProperty('--_blur', '45px');
            header.style = `transform: translateY(0px)`;
        }

    })
}


scrollTracker();