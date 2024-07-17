export const firstCharsOfString = (string) => {
  if (typeof string !== 'string') {
    return '';
  }
  string = string.split(' ');
  if (string.length > 1) {
    return string[0].substring(0, 1) + string[1].substring(0, 1);
  } else {
    return string[0].substring(0, 2);
  }
};

// get full first name & first char of last name
export const shortName = (name) => {
  if (typeof name !== 'string') {
    return '';
  }
  name = name.split(' ');
  if (name.length > 1) {
    return (
      stringCapitalize(name[0]) + ' ' + upper(name[1].substring(0, 1)) + '.'
    );
  } else {
    return name[0];
  }
};

export const snakeToPascalCase = (str) => {
  return str.replace(/(?:^|_)(\w)/g, (_, char) => char.toUpperCase());
};

// check if a object is empty
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

// check if two objects are equals
// if object has methods or dom elements this method will not work
export const isEqualObject = (object1, object2) => {
  return JSON.stringify(object1) === JSON.stringify(object2);
};

// array of null elements
export const arrayOfNullElements = (array) =>
  array.every((element) => !element);

// generate random string
export const generateRandomString = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

//generate random number
export const generateRandomNumber = (digit = 6) => {
  return parseInt(Math.random() * Math.pow(10, digit - 1));
};

// capitalize first character of a string
export const stringCapitalize = (string) =>
  string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : '';

// capilatie first character of a text(capilaize all invidual words)
export const textCapitalize = (string) => {
  if (!string) return '';
  var capitalText = '';
  string
    .split(' ')
    .forEach((word) => (capitalText += ' ' + stringCapitalize(word)));
  return capitalText.slice(1);
};

// filter html, css, js tags and returns inner text only
export const filterHtmlTags = (html) => {
  html = html.replace(/(<style[\w\W]+style>)/g, '');
  html = html.replace(/<[^>]*>?/gm, '');
  html = html.replace(/\&nbsp;/g, ' ');
  html = html.replace(/\s?\{[^}]+\}/g, '');
  html = html.replace(/\s\s+/g, ' ');

  return html;
};

// return a random item from array
export const randomItemFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];
// get file size
export const getFileSize = (size) => {
  const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
  let i = 0;

  while (size > 900) {
    size /= 1024;
    i++;
  }
  return `${Math.floor(Math.round(size * 100) / 100)} ${fSExt[i]}`;
};

// set cursor to the end of content editable div
// https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
export const setEndOfContenteditable = (contentEditableElement) => {
  var range, selection;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange(); //Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection(); //get the selection object (allows you to change selection)
    selection.removeAllRanges(); //remove any selections already made
    selection.addRange(range); //make the range you have just created the visible selection
  } else if (document.selection) {
    //IE 8 and lower
    range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
    range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    range.select(); //Select the range (make it the visible selection
  }
};

// get cursor position in contenteditable div
export const getCursorPosition = (editableDiv) => {
  var caretPos = 0,
    sel,
    range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement('span');
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint('EndToEnd', range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
};

export const typedTextsWidth = (element, type = 'contentEditable') => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  if (type === 'contentEditable')
    return ctx.measureText(element.innerText).width;
  if (type === 'input') return ctx.measureText(element.value).width;
};

// is file is a image file
export const isImageFile = (mimeType) => {
  const arr = mimeType.split('/');
  return Boolean(arr[0] === 'image');
};

// is file is a video file
export const isVideoFile = (mimeType) => {
  const arr = mimeType.split('/');
  return Boolean(arr[0] === 'video');
};

// convert hex code to rgb
export const hexToRgb = (hex, returnRYBObject = false) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  if (returnRYBObject) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  }
  return `${parseInt(result[1], 16)}, ${parseInt(
    result[2],
    16
  )}, ${parseInt(result[3], 16)}`;
};

// return hex code from rgb
export const rgbToHex = (r, g, b) => {
  const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  };
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

export const getEncodedURI = (string) => encodeURI(string);

export const cssPixelToInt = (string) => parseInt(string.slice(0, -2));
export const intToCssPixel = (int) => `${int}px`;

export const isObject = (data) => {
  if (typeof data === 'object' && !Array.isArray(data) && data !== null)
    return true;
  return false;
};

export const isArray = (data) => Array.isArray(data);

export const disableKeys = (event, keys = ['e', 'E', '+', '-']) => {
  if (!keys) return;
  keys.includes(event.key) && event.preventDefault();
};

export const omitPropsFromObject = (object, omittingProps = []) => {
  if (!omittingProps || !omittingProps.length) return object;
  return Object.entries(object).reduce((fields, field) => {
    if (!omittingProps.includes(field[0]))
      fields = { ...fields, [field[0]]: field[1] };
    return fields;
  }, {});
};

export const filterPropsFromObject = (object, filteringProps = []) => {
  if (!filteringProps || !filteringProps.length) return object;
  return Object.entries(object).reduce((fields, field) => {
    if (filteringProps.includes(field[0]))
      fields = { ...fields, [field[0]]: field[1] };
    return fields;
  }, {});
};

// filter out the props that has no value
export const filterNotValuesFromObject = (
  object,
  exceptions = {
    includeFalse: false,
    includeNull: false,
    includeEmptyArray: false
  }
) => {
  if (!isObject(object)) return object;

  const { includeFalse, includeNull, includeEmptyArray } = exceptions;

  return Object.entries(object).reduce((object, [key, value]) => {
    if (isArray(value)) {
      if (includeEmptyArray) return { ...object, [key]: value };
      else {
        if (value.length) return { ...object, [key]: value };
        else return { ...object };
      }
    }

    return value ||
      (includeFalse && value === false) ||
      (includeNull && value === null)
      ? { ...object, [key]: value }
      : { ...object };
  }, {});
};

export const filterArrayUniqueByKey = (array, key = 'id') => {
  const arrayKeys = array.map((a) => a[key]);
  return array.filter((a, i) => arrayKeys.indexOf(a[key]) === i);
};

// rounds any float number
// for usage https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
export const roundFloat = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const scrollToHeight = (height) => {
  if (typeof height === 'number')
    setTimeout(() => {
      window.scrollTo(0, height);
    }, 50);
  if (typeof height === 'string') {
    const el = document.querySelector(height);
    if (el)
      setTimeout(() => {
        console.log(el, el.scrollHeight);
        window.scrollTo(0, el.scrollHeight);
      }, 50);
  }
};

export const scrollbarScrollToHeight = (cssSelector = null, height = null) => {
  if (!cssSelector) cssSelector = '.ps';
  const el = document.querySelector(cssSelector);
  if (el) {
    if (null === height) height = el.scrollHeight;
    setTimeout(() => {
      el.scrollTop = height;
    }, 50);
  }
};

export const scrollElementIntoView = (cssSelector, options = null) => {
  const el = document.querySelector(cssSelector);
  if (el) {
    if (options) el.scrollIntoView(options);
    else el.scrollIntoView();
  }
};

export const scrollToBottom = (cssSelector) => {
  const el = document.querySelector(cssSelector);
  if (el) {
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 5);
  }
};

// if either any of priority or base is not array, then immediately return which one array
// return priority if both are not array
// if both array items are simple(not object or array) return priority
// if array items are object or array, allow deep compare
export function deepCompareArray(
  priority,
  base,
  callback,
  arrayKey = 'id',
  appendNotMatchedBasedItems = true
) {
  if (!isArray(priority) || !isArray(base)) {
    return isArray(priority)
      ? priority
      : isArray(base)
        ? item
        : priority || base;
  }

  if (
    priority.every((p) => !isObject(p) && !isArray(p)) &&
    base.every((b) => !isObject(b) && !isArray(b))
  ) {
    return priority;
  }

  let compared = priority.map((item, index) => {
    if (
      callback &&
      typeof callback === 'function' &&
      typeof callback(
        item,
        base.find((b) => b[arrayKey] == item[arrayKey]),
        index
      ) !== 'undefined'
    ) {
      return callback(
        item,
        base.find((b) => b[arrayKey] == item[arrayKey]),
        index
      );
    }

    const itemInBase = base.find((b) => b[arrayKey] == item[arrayKey]);
    if (isArray(item) && isArray(itemInBase)) {
      return deepCompareArray(item, itemInBase, callback, arrayKey);
    } else if (isObject(item) && isObject(itemInBase)) {
      return deepCompare(item, itemInBase, callback, arrayKey);
    } else {
      return item;
    }
  });

  const priorityArrayKey = priority
    .map((p) => (p[arrayKey] ? p[arrayKey]?.toString() : null))
    .filter((p) => p);

  let baseItemsNotExistsInPriority = [];

  if (appendNotMatchedBasedItems) {
    baseItemsNotExistsInPriority = base.filter((b) => {
      if (!b[arrayKey]) return false;
      return !priorityArrayKey.includes(b[arrayKey]?.toString());
    });
  }

  return [...compared, ...baseItemsNotExistsInPriority];
}

export function deepCompare(
  priority,
  base,
  callback,
  arrayKey = 'id',
  appendNotMatchedBasedItems = true
) {
  const priorityKeys = Object.keys(priority);
  const baseKeys = Object.keys(base);

  const priorityKeysNotExistsInBase = priorityKeys.filter(
    (key) => !baseKeys.includes(key)
  );

  let compared = Object.keys(base).reduce((result, key) => {
    if (
      callback &&
      typeof callback === 'function' &&
      typeof callback(priority[key], base[key], key) !== 'undefined'
    ) {
      return {
        ...result,
        [key]: callback(priority[key], base[key], key)
      };
    }

    if (priority.hasOwnProperty(key)) {
      if (isObject(priority[key]) && isObject(base[key])) {
        return {
          ...result,
          [key]: deepCompare(priority[key], base[key], callback, arrayKey)
        };
      } else if (isArray(priority[key]) && isArray(base[key])) {
        return {
          ...result,
          [key]: deepCompareArray(priority[key], base[key], callback, arrayKey)
        };
      } else {
        return { ...result, [key]: priority[key] };
      }
    } else {
      return { ...result, [key]: base[key] };
    }
  }, {});

  if (appendNotMatchedBasedItems && priorityKeysNotExistsInBase.length) {
    priorityKeysNotExistsInBase.forEach((key) => {
      compared = { ...compared, [key]: priority[key] };
    });
  }
  return compared;
}

export function deepDifferenceArray(
  next,
  previous,
  omitKeys = [],
  callback = null,
  arrayKey = 'id'
) {
  if (!next || !previous) return null;
  // if (!isArray(priority) || !isArray(base)) {
  // 	return isArray(priority)
  // 		? priority
  // 		: isArray(base)
  // 		? item
  // 		: priority || base;
  // }

  if (
    next.every((n) => !isObject(n) && !isArray(n)) &&
    previous.every((p) => !isObject(p) && !isArray(p))
  ) {
    if (JSON.stringify(previous) === JSON.stringify(next)) return null;
    return { diff: true, next, previous };
  }

  return next.map((item, index) => {
    if (
      callback &&
      typeof callback === 'function' &&
      typeof callback(
        item,
        previous.find((p) => p[arrayKey] == item[arrayKey]) || previous[index],
        index
      ) !== 'undefined'
    ) {
      return callback(
        item,
        previous.find((p) => p[arrayKey] == item[arrayKey]) || previous[index],
        index
      );
    }

    if (isArray(item)) {
      if (
        isArray(
          previous.find((p) => p[arrayKey] == item[arrayKey]) || previous[index]
        )
      )
        return deepDifferenceArray(
          item,
          previous[index],
          omitKeys,
          callback,
          arrayKey
        );
    } else if (isObject(item)) {
      const itemInPrev =
        previous.find((p) => p[arrayKey] == item[arrayKey]) || previous[index];

      if (isObject(itemInPrev))
        return deepDifference(item, itemInPrev, omitKeys, callback, arrayKey);
    } else {
      // return item;
      // if (typeof priority[index] !== 'undefined') return priority[index];
      // return item;
    }
  });
}

export function deepDifference(
  next,
  previous,
  omitKeys = [],
  callback = null,
  arrayKey = 'id'
) {
  if (!previous || !next) return null;
  return Object.keys(next).reduce((result, key) => {
    if (
      callback &&
      typeof callback === 'function' &&
      typeof callback(next[key], previous[key], key) !== 'undefined'
    ) {
      return {
        ...result,
        [key]: callback(next[key], previous[key], key)
      };
    }

    if (omitKeys.includes(key)) return { ...result };

    if (previous.hasOwnProperty(key)) {
      if (isObject(next[key]) && isObject(previous[key])) {
        return {
          ...result,
          [key]: deepDifference(
            next[key],
            previous[key],
            omitKeys,
            callback,
            arrayKey
          )
        };
      } else if (isArray(next[key]) && isArray(previous[key])) {
        return {
          ...result,
          [key]: deepDifferenceArray(
            next[key],
            previous[key],
            omitKeys,
            callback,
            arrayKey
          )
        };
      } else {
        if (next[key] === previous[key]) {
          return { ...result };
        } else
          return {
            ...result,
            [key]: {
              diff: true,
              next: next[key],
              previous: previous[key]
            }
          };
      }
    } else {
      return {
        ...result,
        [key]: { diff: true, next: next[key], previous: undefined }
      };
    }
  }, {});
}

export const compareArray = (first, second, key = 'slug') => {
  const itemKey = (item) =>
    !key ? item : key === 'id' ? parseInt(item[key]) : item[key];

  const firstItemKeys = key ? first.map((f) => itemKey(f)) : first;
  const secondItemKeys = key ? second.map((s) => itemKey(s)) : second;

  const added = first.filter((f) => !secondItemKeys.includes(itemKey(f)));
  const removed = second.filter((s) => !firstItemKeys.includes(itemKey(s)));
  if (first.length === second.length) {
  }

  return {
    isEqual: first.length === second.length,
    isFirstArrayBigger: first.length > second.length,
    added, // available in first but not in second,
    removed // available in first but not in second,
  };
};

export const arrayFromNumber = (number, startFromZero = false) => {
  return Array.from(Array(number).keys(), (x) => (startFromZero ? x : x + 1));
};

export const arrayFromNumberRange = (start, end) => {
  return Array.from(Array(end).keys(), (x) => x + 1).filter((x) => x >= start);
};

export const kebabToCamelCase = (string) => {
  return string.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

export const camelToKebabCase = (string) => {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

export const isJsonParsable = (string) => {
  try {
    const parsed = JSON.parse(string);
    return Boolean(parsed);
  } catch (err) {
    return false;
  }
};

export const addItemToArray = (array, index, item) => {
  const firstPart = array.slice(0, index);
  const secondPart = array.slice(index);

  return [...firstPart, item, ...secondPart];
};

export const makeDelay = async (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
}
