try {
	require("module-alias/register");
} catch (e) {
	console.log("module-alias import error!");
}

import * as vscode from "vscode";
import { EXTENSION_CONSTANT } from "./constant"; // Assuming constant.ts is in the same directory
import { LeftPanelWebview } from "./providers/left-webview-provider"; // Assuming left-webview-provider.ts is in the providers folder

export function activate(context: vscode.ExtensionContext) {
	// Define a message listener for the webview
	let panel: vscode.WebviewPanel | undefined = undefined;

	panel = vscode.window.createWebviewPanel(
		EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
		"Left Panel",
		vscode.ViewColumn.Beside,
		{
			enableScripts: true,
			retainContextWhenHidden: true,
		}
	);
	panel.webview.onDidReceiveMessage((message) => {
		switch (message.action) {
			case "OPEN_URL":
				vscode.env.openExternal(vscode.Uri.parse(message.data.url));
				break;
			default:
				console.warn(`Unhandled message action: ${message.action}`);
				break;
		}
	});

	// Register command to open a URL
	let helloWorldCommand = vscode.commands.registerCommand(
		"vscode-webview-extension-with-react.helloWorld",
		() => {
			const url = vscode.Uri.parse("https://chatgpt.com/");
			vscode.env.openExternal(url);
		}
	);
	context.subscriptions.push(helloWorldCommand);

	// Register the webview view provider
	const leftPanelWebViewProvider = new LeftPanelWebview(
		context.extensionUri, // Pass the extension's URI to the provider
		{} // Additional options for the provider if needed
	);
	let view = vscode.window.registerWebviewViewProvider(
		EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
		leftPanelWebViewProvider
	);
	context.subscriptions.push(view);
}

// This method is called when your extension is deactivated
export function deactivate() {
	// Cleanup logic if needed
}
