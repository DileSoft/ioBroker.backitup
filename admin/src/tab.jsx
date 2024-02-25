import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "@iobroker/adapter-react-v5/Theme";
import Utils from "@iobroker/adapter-react-v5/Components/Utils";
import TabApp from "./tab-app";
import './tab.css';

let themeName = Utils.getThemeName();

function build() {
	ReactDOM.render(
		<MuiThemeProvider theme={theme(themeName)}>
			<TabApp
				adapterName="backitup"
				onThemeChange={(_theme) => {
					themeName = _theme;
					build();
				}}
			/>
		</MuiThemeProvider>,
		document.getElementById("root"),
	);
}

build();