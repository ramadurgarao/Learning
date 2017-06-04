function domLoaded() {
			console.log("DOM Loaded successfully");
			var btn = document.querySelector("#start_duration"),
				dial = document.querySelector("#dialpin"),
				watch = "",
				timerClock = document.querySelector("#timer_clock");
			btn.onclick = function () {
				var dur = document.querySelector("#duration"),
					breakTime = document.querySelector("#breaktime"),
					timerDur = dur.value,
					timerBreak = breakTime.value;
				if (timerDur) {
					timerDur = Number(timerDur);
					timerBreak = Number(timerBreak);					
					if (watch) {
						watch.pauseTimer();
            
						// dial.style.cssText = "transition:transform 0s linear";
						// dial.style.transform = "rotate(0deg)";
					}
					setTimeout(function(){
						// dial.style.cssText = "transition:transform "+(timerDur*60)+"s linear";
            dial.style.cssText = "animation:rotation "+(timerDur*60)+"s linear";
						watch = new Timer(timerDur,timerBreak);
						watch.startTimer();
						// dial.style.transform = "rotate(360deg)";
					},1000);
					
				}								
			};
			timerClock.onclick = function (event) {
				var cTarget = event.currentTarget,
					type = cTarget.getAttribute("status");
				if (type === "pause") {
					watch.resetTimer();
					cTarget.setAttribute("status","");	
				} else {
					watch.pauseTimer();
					cTarget.setAttribute("status","pause");
				}				
			};
		}
		function Timer(timeInMinutes,breakTime){
			var durTime = timeInMinutes,
				breakTime = breakTime,
				seconds = timeInMinutes*60,
				timeHandler = null,
				self = this,
				breakOrActual = "actual";
			this.startTimer = function () {
				var timerStr = document.querySelector("#show_time");
				(function(sec){
					if (sec >= 0) {
						seconds = sec;
						var strToShow = (parseInt(sec/60)<10?"0":"")+parseInt(sec/60)+":"+(sec%60<10?"0":"")+(sec%60);
						timerStr.innerText = strToShow;
						var fn = arguments.callee;
						timeHandler = setTimeout(function(){
							fn(sec-1);
						},1000);
					} else {
						var dial = document.querySelector("#dialpin");
						// dial.style.cssText = "transition:transform 1s linear";
						// dial.style.transform = "rotate(0deg)";
						if (breakOrActual === "actual") {
							breakOrActual = "break";
							seconds = breakTime*60;	

						} else {
							breakOrActual = "actual";
							seconds = timeInMinutes*60;	
						}
						
							// dial.style.cssText = "transition:transform "+seconds+"s linear";
							// dial.style.transform = "rotate(360deg)";
            dial.style.removeProperty("animation");
            setTimeout(function(){ 
              dial.style.cssText = "animation:rotation "+(seconds)+"s linear";
							self.startTimer();
						},500);			
					}
				})(seconds);
			};
			this.pauseTimer = function () {
        var dial = document.querySelector("#dialpin");
				clearTimeout(timeHandler);
        dial.style.setProperty("animation-play-state","paused");
			};
			this.resetTimer = function () {
        var dial = document.querySelector("#dialpin");
				this.startTimer();
        dial.style.setProperty("animation-play-state","running");
			};
		};