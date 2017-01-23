"use strict";

var App = React.createClass({
    displayName: "App",

    getInitialState: function getInitialState() {
        return {
            soundCloudId: "eb48d835e7bcd8ca768bc44c247d0782",
            showSearch: false,
            showSettings: false,
            showFavorites: false,
            showQueue: false,
            currentSong: {},
            userFavorites: [],
            recentlyPlayed: [],
            queue: [],
            isPlaying: false
        };
    },
    componentDidMount: function componentDidMount() {
        // Soundcloud SDK
        this.initializeSoundcloudSDK();

        /////////////////////////////////////
        // Audio context + Analyzer setup    //
        /////////////////////////////////////
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var audioElement = document.getElementById('audioElement');
        audioElement.crossOrigin = "anonymous";
        var audioSrc = audioCtx.createMediaElementSource(audioElement);
        var analyser = audioCtx.createAnalyser();

        // Bind our analyser to the media element source.
        audioSrc.connect(analyser);
        audioSrc.connect(audioCtx.destination);

        // Sound wave data
        var frequencyData = new Uint8Array(600);
        var timeData = new Uint8Array(600);

        // Get the average frequency amplitudes
        function getAverageVolume(array) {
            var values = 0;
            var average;

            var length = array.length;

            // get all the frequency amplitudes
            for (var i = 0; i < length; i++) {
                values += array[i];
            }

            average = values / length;
            return average;
        }

        /////////////////////////
        // Playback Controls    //
        ////////////////////////
        var play = document.getElementById("play"),
            pause = document.getElementById("pause"),
            scrubber = document.getElementById("seek"),
            loading = document.getElementById("loading"),
            curTimeContainer = document.getElementById("current-time"),
            durationContainer = document.getElementById("duration"),
            duration = audioElement.duration,
            currentTime = 0;

        var that = this;
        // Play the song
        play.addEventListener('click', function () {
            audioElement.play();
            // Set scrub length
            scrubber.max = audioElement.duration;
            that.setState({ isPlaying: true });
        });

        // Pause Song
        pause.addEventListener('click', function () {
            audioElement.pause();
            that.setState({ isPlaying: false });
        });

        //////////////////
        // Scrubbing     //
        //////////////////

        // Set scrub length
        audioElement.onplaying = function () {
            scrubber.max = audioElement.duration;
        };

        // Update playback when user changes srubbing
        scrubber.onchange = function () {
            audioElement.currentTime = scrubber.value;
            scrubber.max = audioElement.duration;
        };

        //////////////////
        // Playback     //
        //////////////////

        // Allow for HHMMSS time formatting
        String.prototype.toMMSS = function () {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - hours * 3600) / 60);
            var seconds = sec_num - hours * 3600 - minutes * 60;

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = minutes + ':' + seconds;
            return time;
        };

        // While Playing
        audioElement.addEventListener('timeupdate', function () {
            // Update Scrubber
            var curtime = parseInt(audioElement.currentTime, 10);
            scrubber.value = curtime;

            // Update track time
            var curTimeFormatted = curtime.toString().toMMSS(),
                durationFormatted = audioElement.duration.toString().toMMSS();

            durationContainer.innerHTML = durationFormatted;
            curTimeContainer.innerHTML = curTimeFormatted;
        });

        // Buffering
        audioElement.addEventListener('waiting', function () {
            loading.style.display = "block";
        });

        // Playing
        audioElement.addEventListener('playing', function () {
            loading.style.display = "none";
            play.style.display = "none";
            pause.style.display = "block";
        });

        audioElement.addEventListener('pause', function () {
            play.style.display = "block";
            pause.style.display = "none";
        });

        /////////////////////////
        // Frequecy bar SVG     //
        /////////////////////////
        var svgHeight = '1200';
        var svgWidth = window.innerWidth;
        var barPadding = '1';

        function createSvg(parent, height, width) {
            return d3.select(parent).append('svg').attr('height', height).attr('width', width);
        }

        var svg = createSvg('#graph', svgHeight, svgWidth);

        // Create our initial D3 chart.
        svg.selectAll('rect').data(frequencyData).enter().append('rect').attr('x', function (d, i) {
            return i * (svgWidth / timeData.length);
        }).attr('width', svgWidth / timeData.length - barPadding).attr('fill', function (d) {
            return '#52B6D2';
        });;

        // Change the frequency bar colors
        document.getElementById("blue-freq-bars").addEventListener("click", function () {
            svg.selectAll('rect').attr('fill', function (d) {
                return '#52B6D2';
            });
        });

        document.getElementById("white-freq-bars").addEventListener("click", function () {
            svg.selectAll('rect').attr('fill', function (d) {
                return '#fff';
            });
        });

        document.getElementById("black-freq-bars").addEventListener("click", function () {
            svg.selectAll('rect').attr('fill', function (d) {
                return '#000';
            });
        });

        // Continuously loop and update chart with frequency data.
        var barsType = frequencyData;
        function renderChart() {
            requestAnimationFrame(renderChart);
            // Reset art levels
            document.getElementById("album-art").style.webkitFilter = "blur(0px)";
            document.getElementById("album-art").style.filter = "blur(0px)";

            // Copy frequency data to frequencyData array.

            analyser.getByteFrequencyData(frequencyData);
            analyser.getByteTimeDomainData(timeData);

            // Get the average level
            var average = Math.ceil(getAverageVolume(barsType) / 10) * 10;

            // Update d3 chart with new data.
            svg.selectAll('rect').data(barsType).attr('y', function (d) {

                if (barsType == timeData) {
                    return svgHeight - d * 0.33;
                } else {
                    return svgHeight - d * 0.75;
                }
            }).attr('height', function (d) {

                if (barsType == timeData) {
                    return d * 0.33;
                } else {
                    return d * 0.75;
                }
            });

            // Pulsate the art
            document.getElementById("album-art").style.webkitFilter = "blur(" + average / 6.666 + "px)";
            document.getElementById("album-art").style.filter = "blur(" + average / 6.666 + "px)";
        }

        // Run the loop
        renderChart();

        // Change the frequency type
        var frequencyBtn = document.getElementById("frequency-bars"),
            waveformBtn = document.getElementById("waveform-bars");

        frequencyBtn.addEventListener("click", function () {
            barsType = frequencyData;
        });

        waveformBtn.addEventListener("click", function () {
            barsType = timeData;
        });
    },
    initializeSoundcloudSDK: function initializeSoundcloudSDK() {
        // Initialize SDK
        SC.initialize({
            client_id: this.state.soundCloudId
        });
    },
    showSearch: function showSearch() {
        this.setState({ showSearch: true });
    },
    closeSearch: function closeSearch() {
        this.setState({ showSearch: false });
    },
    showSettings: function showSettings() {
        this.setState({ showSettings: true });
    },
    closeSettings: function closeSettings() {
        this.setState({ showSettings: false });
    },
    showFavorites: function showFavorites() {
        this.setState({ showFavorites: true });
    },
    closeFavorites: function closeFavorites() {
        this.setState({ showFavorites: false });
    },
    showQueue: function showQueue() {
        this.setState({ showQueue: true });
    },
    closeQueue: function closeQueue() {
        this.setState({ showQueue: false });
    },
    playSong: function playSong(song, event) {

        this.setState({ isPlaying: true });

        // Get a bigger image
        var artworkUrl = song.artwork_url;
        var artwork = artworkUrl ? artworkUrl.replace("large", "t500x500") : "assets/images/mm.jpg";

        // Apply the album art as the background image
        document.getElementById("album-art").style.backgroundImage = "url('" + artwork + "')";
        document.getElementById("thumbnail-art").style.backgroundImage = "url('" + artwork + "')";

        // Set title
        document.getElementById("song-title").innerHTML = song.title;
        document.getElementById("song-user").innerHTML = song.user.username;

        audioElement.src = song.stream_url + "?client_id=" + this.state.soundCloudId;
        audioElement.play();

        this.closeSearch();

        this.setState({ currentSong: song });
        console.log(song);
        console.log(this.state.currentSong);
    },
    renderHomeScreen: function renderHomeScreen() {
        if (!this.state.isPlaying) {
            return React.createElement(
                "div",
                { style: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0, left: 0,
                        zIndex: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(0,0,0,0.5)"
                    } },
                React.createElement(
                    "div",
                    { style: { textAlign: "center" } },
                    React.createElement("img", { style: { width: 50, margin: 20 }, src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/166133/stratus_logo.svg" }),
                    React.createElement(
                        "h1",
                        { style: { color: "#fff", textTransform: "uppercase", margin: "0px 0px 10px" } },
                        "Welcome to MI Music."
                    ),
                    React.createElement(
                        "h1",
                        { style: { color: "#aaa", fontSize: "1.2em", paddingTop: 0 } },
                        "Start by searching for a Song."
                    )
                )
            );
        }
    },
    render: function render() {
        return React.createElement(
            "div",
            { id: "app" },
            this.renderHomeScreen(),
            React.createElement(Search, { active: this.state.showSearch,
                show: this.showSearch,
                close: this.closeSearch,
                playSong: this.playSong }),
            React.createElement(Player, { SCID: this.state.soundCloudID }),
            React.createElement(SettingsBox, { show: this.showSettings,
                hide: this.closeSettings,
                active: this.state.showSettings }),
            React.createElement(LoadingOverlay, null)
        );
    }
});

var Search = React.createClass({
    displayName: "Search",

    getInitialState: function getInitialState() {
        return {
            value: "",
            trackResults: []
        };
    },
    handleChange: function handleChange(event) {
        var newVal = event.target.value;
        this.setState({ value: newVal });

        // Check to see if search is present, otherwise close the search results
        if (newVal.length == 0) {
            this.props.close();
        } else {
            this.doSearch();
        }
    },
    doSearch: function doSearch() {
        var searchApp = this,
            timer;

        // Show the overlay
        this.props.show();

        clearTimeout(timer);
        timer = setTimeout(function () {
            // Make the search call then set track state
            SC.get('/tracks', {
                q: this.state.value,
                limit: 50
            }).then(function (tracks) {
                searchApp.setState({ trackResults: tracks });
                $(".track-tile").velocity("stop");
                $(".track-tile").velocity("transition.flipXIn", { stagger: 100 });
            });
        }.bind(this), 1000);
    },
    render: function render() {
        var inputValue = this.state.value,
            trackResults = this.state.trackResults,
            trackAmount = trackResults.length,
            active = this.props.active ? "active" : "";
        return React.createElement(
            "div",
            { id: "search" },
            React.createElement(
                "div",
                { id: "search-wrapper" },
                React.createElement("div", { id: "main-logo" }),
                React.createElement("input", { id: "search-input", className: active, placeholder: "Type to search", value: inputValue, onFocus: this.handleChange, onChange: this.handleChange })
            ),
            React.createElement(
                "div",
                { id: "search-results", className: active },
                React.createElement(
                    "header",
                    null,
                    "Showing ",
                    trackAmount,
                    " results for: ",
                    inputValue
                ),
                React.createElement("div", { id: "close-search", onClick: this.props.close }),
                trackResults.map(function (track, i) {
                    var artURL = track.artwork_url ? track.artwork_url.replace("large", "t500x500") : "assets/images/mm.jpg";
                    return React.createElement(TrackTile, { key: i, title: track.title, username: track.user.username, onClick: this.props.playSong.bind(null, track), artwork: artURL });
                }.bind(this))
            )
        );
    }
});

var TrackTile = React.createClass({
    displayName: "TrackTile",

    getInitialState: function getInitialState() {
        return {
            active: false
        };
    },
    isActive: function isActive() {
        this.setState({ active: true });
    },
    isNotActive: function isNotActive() {
        this.setState({ active: false });
    },
    render: function render() {
        var classes = this.state.active ? "active tile-overlay" : "tile-overlay";
        return React.createElement(
            "div",
            { className: "track-tile", onClick: this.props.onClick, onMouseOver: this.isActive, onMouseLeave: this.isNotActive },
            React.createElement(
                "div",
                { className: "info-block" },
                React.createElement(
                    "div",
                    { className: "album-art" },
                    React.createElement("img", { src: this.props.artwork }),
                    React.createElement(
                        "div",
                        { className: classes },
                        React.createElement("a", { className: "play" }),
                        React.createElement(
                            "div",
                            { className: "toolbelt" },
                            React.createElement(
                                "a",
                                { className: "add-to-favorites" },
                                React.createElement("img", { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/166133/star.svg" })
                            ),
                            React.createElement(
                                "a",
                                { className: "add-to-queue" },
                                React.createElement("img", { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/166133/queue.svg" })
                            )
                        )
                    )
                ),
                React.createElement(
                    "p",
                    { className: "title" },
                    this.props.title
                ),
                React.createElement(
                    "p",
                    { className: "user" },
                    this.props.username
                )
            )
        );
    }
});

var Player = React.createClass({
    displayName: "Player",

    render: function render() {
        return React.createElement(
            "div",
            { id: "player" },
            React.createElement("div", { id: "album-art" }),
            React.createElement("div", { id: "graph" }),
            React.createElement("audio", { id: "audioElement" }),
            React.createElement(ControlBar, null)
        );
    }
});

var LoadingOverlay = React.createClass({
    displayName: "LoadingOverlay",

    render: function render() {
        return React.createElement(
            "div",
            { id: "loading", style: { display: "flex", alignItems: "center", justifyContent: "center" } },
            React.createElement("img", { src: "http://jxnblk.com/loading/loading-bars.svg" })
        );
    }
});

var SettingsBox = React.createClass({
    displayName: "SettingsBox",

    render: function render() {
        var active = this.props.active ? "active" : "";
        return React.createElement(
            "div",
            { id: "settings-wrapper", onMouseOver: this.props.show, onMouseLeave: this.props.hide },
            React.createElement("div", { id: "settings-button" }),
            React.createElement(
                "div",
                { id: "settings-drawer", className: active },
                React.createElement(
                    "h4",
                    null,
                    React.createElement("img", { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/166133/gear-icon-white.svg" }),
                    "Settings"
                ),
                React.createElement(
                    "ul",
                    { className: "visualizer-colors" },
                    React.createElement(
                        "span",
                        { className: "title" },
                        "Visualizer Color"
                    ),
                    React.createElement(
                        "li",
                        { id: "white-freq-bars", "data-color": "#ffff" },
                        "White"
                    ),
                    React.createElement(
                        "li",
                        { id: "blue-freq-bars", "data-color": "#52B6D2" },
                        "Blue"
                    ),
                    React.createElement(
                        "li",
                        { id: "black-freq-bars", "data-color": "#000" },
                        "Black"
                    )
                ),
                React.createElement(
                    "ul",
                    { className: "visualizer-style" },
                    React.createElement(
                        "span",
                        { className: "title" },
                        "Visualizer Style"
                    ),
                    React.createElement(
                        "li",
                        { id: "frequency-bars" },
                        "Frequency"
                    ),
                    React.createElement(
                        "li",
                        { id: "waveform-bars" },
                        "Waveform"
                    )
                )
            )
        );
    }
});

var Favorites = React.createClass({
    displayName: "Favorites",

    render: function render() {
        var active = this.props.active ? "active" : "";
        return React.createElement(
            "div",
            { id: "favorites-wrapper", onMouseOver: this.props.show, onMouseLeave: this.props.hide },
            React.createElement("div", { id: "favorites-button" }),
            React.createElement(
                "div",
                { id: "favorites-drawer", className: active },
                React.createElement(
                    "h4",
                    null,
                    React.createElement("img", { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/166133/star.svg" }),
                    "Favorites"
                ),
                React.createElement(
                    "p",
                    null,
                    "There are currently no songs in your favorites."
                )
            )
        );
    }
});

var Queue = React.createClass({
    displayName: "Queue",

    render: function render() {
        var active = this.props.active ? "active" : "";
        return React.createElement(
            "div",
            { id: "queue-wrapper", onMouseOver: this.props.show, onMouseLeave: this.props.hide },
            React.createElement("div", { id: "queue-button" }),
            React.createElement(
                "div",
                { id: "queue-drawer", className: active },
                React.createElement(
                    "h4",
                    null,
                    React.createElement("img", { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/166133/queue.svg" }),
                    " Queue"
                ),
                React.createElement(
                    "p",
                    null,
                    "There are currently no songs in your queue."
                )
            )
        );
    }
});

var ControlBar = React.createClass({
    displayName: "ControlBar",

    render: function render() {
        var active = this.props.active ? "active" : "";
        return React.createElement(
            "div",
            { id: "controls" },
            React.createElement("a", { id: "play" }),
            React.createElement("a", { id: "pause" }),
            React.createElement("div", { id: "current-time" }),
            React.createElement("input", { id: "seek", onchange: "", type: "range" }),
            React.createElement("div", { id: "duration" }),
            React.createElement(
                "div",
                { id: "song-info" },
                React.createElement("div", { id: "song-title" }),
                React.createElement("div", { id: "song-user" })
            ),
            React.createElement("div", { id: "thumbnail-art" })
        );
    }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app-render'));