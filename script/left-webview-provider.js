(function () {
	const vscode = acquireVsCodeApi();
	document
		.getElementById(ELEMENT_IDS.TRIGGER_MESSAGE_BUTTON)
		.addEventListener("click", () => {
			const urlToOpen = "https://google.com"; // Replace with your desired URL

			// Using vscode.postMessage to open URL in browser
			vscode.postMessage({
				action: POST_MESSAGE_ACTION.OPEN_URL,
				data: {
					url: urlToOpen,
				},
			});
		});
})();
