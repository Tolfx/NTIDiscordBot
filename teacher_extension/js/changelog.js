var sVer = chrome.runtime.getManifest().version,
  sChangelog =
    '<h3 id="changelog">What\'s new in Version </li>' + sVer + '</h3>' +
    '<ul>' +
      '<li>Added support for forms that require bubbling (v9.6.0)</li>' +
      '<li>Upgraded jQuery from v3.3.1 to v3.5.1 (v9.6.1)</li>' +
      '<li>Improved fuzzy label matching logic (v9.6.2)</li>' +
      '<li>Fixed some Google Forms checkboxes not autofilled (v9.6.4)</li>' +
      '<li>Moved changelog.txt to tohodo.com (v9.6.4)</li>' +
      '<li>Added ability to autocheck using variables (v9.6.4)</li>' +
      '<li>Added ability to match labels in Google Forms (v9.6.5)</li>' +
      '<li>Fixed broken help links (v9.6.5)</li>' +
      '<li>Fixed regression with fuzzy matching logic (v9.6.6)</li>' +
      '<li>Fixed incorrect autofill count on some forms (v9.6.6)</li>' +
    '</ul>' +
    '<h4><a href="https://www.tohodo.com/autofill/changelog.txt" target="_blank">Version History</a> &raquo;</h4>';
