// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss";
import socket from "./socket";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faKey, faHeart, faHeartBroken, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faHeart, faHeartBroken, faThumbsUp, faThumbsDown);

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import init_page from './page';

window.addEventListener("load", () => {
    let root = document.getElementById('root');
    let channel = socket.channel("recipes:" + "recipes", {});
    channel
        .join()
        .receive("ok", resp => { console.log("Joined", resp); })
        .receive("error", resp => { console.log("Unable to join", resp); });
    init_page(root, channel);
});