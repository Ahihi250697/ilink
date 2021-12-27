const Process = {
    processLine: $(".process-line"),
    processValue: $(".process-value"),
    options: {
        start: 0,
        end: 100,
    },
    process: null,

    ProcessCounter: function () {
        let _timeDelay = Math.random();
        this.options.start += _timeDelay * 5;

        if (this.options.start >= this.options.end) {
            this.options.start = this.options.end;
            clearTimeout(this.process);
        } else {
            this.process = setTimeout(() => {
                this.ProcessCounter();
            }, _timeDelay * 1000);
        }

        let _percent = ((100 * this.options.start) / this.options.end).toFixed(
            2
        );
        this.processLine.css({
            width: `${_percent}%`,
        });

        this.processValue.html(`${_percent}%`);
    },

    init: function () {
        this.ProcessCounter(this.options.start);
    },
};
// Process.options = {
//     start: 50,
//     end: 200
// }
// Process.init();
// let btn = document.createElement("BUTTON"); // Create a <button> element
// btn.innerHTML = "CLICK ME <p>adasd</p>"; // Insert text
// document.body.appendChild(btn);