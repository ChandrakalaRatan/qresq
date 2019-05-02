import Webmap from "esri/Webmap";
import MapView from "esri/views/MapView";
import Search from "esri/widgets/Search";


const noop = () => {};

export const webmap = new Webmap({
    portalItem: {
        id: ""
    }
});

export const view = new MapView({
    map: webmap
});

export const search = new Search({ view });
view.ui.add(search, "top-right");

export const initialize = (container) => {
    view.container = container;
    view
        .when()
        .then(_=> {
            console.log("map and view are ready");
        })
        .catch(noop);
        return () => {
            view.container = null;
        };
};
