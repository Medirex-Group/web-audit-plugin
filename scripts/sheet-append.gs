const SHARED_KEY = 'YOUR_SHARED_KEY';
const COLUMN_HEADERS = ['scope', 'url', 'check', 'verdict', 'detail'];

function doPost(request) {
  const payload = parseRequestBody(request);
  if (!payload) {
    return textResponse('bad json');
  }
  if (payload.key !== SHARED_KEY) {
    return textResponse('unauthorized');
  }

  const reportRows = validReportRows(payload.rows);
  if (reportRows.length === 0) {
    return textResponse('no valid rows');
  }

  const scriptLock = LockService.getScriptLock();
  scriptLock.waitLock(30000);
  try {
    const tab = createRunTab(payload.run);
    const headerAndRows = [COLUMN_HEADERS].concat(reportRows);
    tab.getRange(1, 1, headerAndRows.length, COLUMN_HEADERS.length).setValues(headerAndRows);
    return textResponse('ok ' + reportRows.length);
  } finally {
    scriptLock.releaseLock();
  }
}

function parseRequestBody(request) {
  try {
    return JSON.parse(request.postData.contents);
  } catch (parseError) {
    return null;
  }
}

function validReportRows(rows) {
  if (!Array.isArray(rows)) {
    return [];
  }
  const rowsWithExpectedWidth = rows.filter(function (row) {
    return Array.isArray(row) && row.length === COLUMN_HEADERS.length;
  });
  return rowsWithExpectedWidth.map(function (row) {
    return row.map(function (cellValue) {
      return String(cellValue == null ? '' : cellValue);
    });
  });
}

function createRunTab(run) {
  const spreadsheet = SpreadsheetApp.getActive();
  const siteName = String((run && run.site) || 'audit').slice(0, 60);
  const runDate = String((run && run.date) || '');
  const baseName = (sanitizeTabName(siteName + ' ' + runDate) || 'audit').slice(0, 90);

  let tabName = baseName;
  let suffix = 2;
  while (spreadsheet.getSheetByName(tabName)) {
    tabName = (baseName + ' #' + suffix).slice(0, 99);
    suffix++;
  }
  return spreadsheet.insertSheet(tabName);
}

function sanitizeTabName(rawName) {
  const forbiddenChars = ['/', '\\', ':', '?', '*', '[', ']'];
  let cleaned = '';
  for (let index = 0; index < rawName.length; index++) {
    const char = rawName.charAt(index);
    cleaned += forbiddenChars.indexOf(char) === -1 ? char : ' ';
  }
  const nonEmptyWords = cleaned.split(' ').filter(function (word) {
    return word.length > 0;
  });
  return nonEmptyWords.join(' ');
}

function textResponse(text) {
  return ContentService.createTextOutput(text);
}
