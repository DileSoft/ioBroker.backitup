import React from "react";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Loader from "@iobroker/adapter-react-v5/Components/Loader";
//import TabContainer from "@iobroker/adapter-react-v5/Components/TabContainer";

import GenericApp from "@iobroker/adapter-react-v5/GenericApp";

/*
const styles = (_theme) => ({
	root: {},
});
*/
/**
 * @type {(_theme: Theme) => import("@material-ui/styles").StyleRules}
 */
const styles = (_theme) => ({
    root: {},
    tabContent: {
        padding: 10,
        height: 'calc(100% - 64px - 48px - 20px)',
        overflow: 'auto'
    },
    tabContentIFrame: {
        padding: 10,
        height: 'calc(100% - 64px - 48px - 20px - 38px)',
        overflow: 'auto'
    },
    selected: {
        color: _theme.palette.mode === 'dark' ? undefined : '#FFF !important',
    },
    indicator: {
        backgroundColor: _theme.palette.mode === 'dark' ? _theme.palette.secondary.main : '#FFF',
    },
});


class TabApp extends GenericApp {
	// @ts-ignore
	constructor(props) {
		const extendedProps = {
			...props,
			bottomButtons: false,
			encryptedFields: [],
			translations: {
				"en": require("../i18n/en/translations.json"),
				"de": require("../i18n/de/translations.json"),
				"ru": require("../i18n/ru/translations.json"),
				"pt": require("../i18n/pt/translations.json"),
				"nl": require("../i18n/nl/translations.json"),
				"fr": require("../i18n/fr/translations.json"),
				"it": require("../i18n/it/translations.json"),
				"es": require("../i18n/es/translations.json"),
				"pl": require("../i18n/pl/translations.json"),
				"uk": require("../i18n/uk/translations.json"),
				"zh-cn": require("../i18n/zh-cn/translations.json"),
			},
		};
		super(props, extendedProps);
	}

	onConnectionReady() {
		// executed when connection is ready
	}

	render() {
		/*
		if (!this.state.loaded) {
			return super.render();
		}
		*/
		if (!this.state.loaded) {
			return <MuiThemeProvider theme={this.state.theme}>
				<Loader theme={this.state.themeType}/>
			</MuiThemeProvider>;
		}

		return (
			<div className="App">
				<MuiThemeProvider theme={this.state.theme}>
					Here is place for the Content from tab.js and tab_m.html_old
				</MuiThemeProvider>;
				{this.renderError()}
				{this.renderToast()}
			</div>
		);
	}
}

export default withStyles(styles)(TabApp);