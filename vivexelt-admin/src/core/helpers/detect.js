import isMobile from 'ismobilejs'

const Detect = {
  browser: '',
  os: '',

  /**
   * Get client browser
   * @return {string}
   */
  getBrowser() {
    if (Detect.browser) {
      return Detect.browser
    }

    const navigatorAgent = navigator.userAgent
    let browserName = navigator.appName
    let fullVersion = parseFloat(navigator.appVersion).toString()
    let nameOffset, verOffset, ix

    if (navigatorAgent.indexOf('Opera') !== -1) {
      // In Opera, the true version is after "Opera" or after "Version"

      verOffset = navigatorAgent.indexOf('Opera')
      browserName = 'Opera'
      fullVersion = navigatorAgent.substring(verOffset + 6)

      if (navigatorAgent.indexOf('Version') !== -1) {
        verOffset = navigatorAgent.indexOf('Version')
        fullVersion = navigatorAgent.substring(verOffset + 8)
      }
    } else if (navigatorAgent.indexOf('MSIE') !== -1) {
      // In MSIE, the true version is after "MSIE" in userAgent

      verOffset = navigatorAgent.indexOf('MSIE')
      browserName = 'Microsoft Internet Explorer'
      fullVersion = navigatorAgent.substring(verOffset + 5)
    } else if (navigatorAgent.indexOf('Chrome') !== -1) {
      // In Chrome, the true version is after "Chrome"

      verOffset = navigatorAgent.indexOf('Chrome')
      browserName = 'Chrome'
      fullVersion = navigatorAgent.substring(verOffset + 7)
    } else if (navigatorAgent.indexOf('CriOS') !== -1) {
      // In Chrome Mobile, the true version is after "CriOS"

      verOffset = navigatorAgent.indexOf('CriOS')
      browserName = 'Chrome'
      fullVersion = navigatorAgent.substring(verOffset + 5)
      if (fullVersion.indexOf('/') !== -1) {
        fullVersion = fullVersion.substring(1)
      }
    } else if (navigatorAgent.indexOf('Safari') !== -1) {
      // In Safari, the true version is after "Safari" or after "Version"

      verOffset = navigatorAgent.indexOf('Safari')
      browserName = 'Safari'
      fullVersion = navigatorAgent.substring(verOffset + 7)
      if (navigatorAgent.indexOf('Version') !== -1) {
        verOffset = navigatorAgent.indexOf('Version')
        fullVersion = navigatorAgent.substring(verOffset + 8)
      }
    } else if (navigatorAgent.indexOf('Firefox') !== -1) {
      // In Firefox, the true version is after "Firefox"

      verOffset = navigatorAgent.indexOf('Firefox')
      browserName = 'Firefox'
      fullVersion = navigatorAgent.substring(verOffset + 8)
    } else if (navigatorAgent.lastIndexOf(' ') + 1 < navigatorAgent.lastIndexOf('/')) {
      // In most other browsers, "name/version" is at the end of userAgent

      nameOffset = navigatorAgent.lastIndexOf(' ') + 1
      verOffset = navigatorAgent.lastIndexOf('/')
      browserName = navigatorAgent.substring(nameOffset, verOffset)
      fullVersion = navigatorAgent.substring(verOffset + 1)
      if (browserName.toLowerCase() === browserName.toUpperCase()) {
        browserName = navigator.appName
      }
    }

    // trim the fullVersion string at semicolon/space if present
    if (fullVersion.indexOf(';') !== -1) {
      ix = fullVersion.indexOf(';')
      fullVersion = fullVersion.substring(0, ix)
    }

    if (fullVersion.indexOf(' ') !== -1) {
      ix = fullVersion.indexOf(' ')
      fullVersion = fullVersion.substring(0, ix)
    }

    return `${browserName} ${fullVersion}`
  },

  /**
   * Get client os
   * @return {string}
   */
  getOS() {
    if (Detect.os) {
      return Detect.os
    }

    let os = null
    let osVersion = null
    const navigatorVer = navigator.appVersion
    const navigatorAgent = navigator.userAgent
    const clientStrings = [
      { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
      { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
      { s: 'Windows Vista', r: /Windows NT 6.0/ },
      { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
      { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
      { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
      { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
      { s: 'Windows 98', r: /(Windows 98|Win98)/ },
      { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
      { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: 'Windows CE', r: /Windows CE/ },
      { s: 'Windows 3.11', r: /Win16/ },
      { s: 'Android', r: /Android/ },
      { s: 'Open BSD', r: /OpenBSD/ },
      { s: 'Sun OS', r: /SunOS/ },
      { s: 'Linux', r: /(Linux|X11)/ },
      { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
      { s: 'Mac OS X', r: /Mac OS X/ },
      { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: 'QNX', r: /QNX/ },
      { s: 'UNIX', r: /UNIX/ },
      { s: 'BeOS', r: /BeOS/ },
      { s: 'OS/2', r: /OS\/2/ },
      {
        s: 'Search Bot',
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ]
    for (let id = 0; id < clientStrings.length; id++) {
      const cs = clientStrings[id]
      if (cs.r.test(navigatorAgent)) {
        os = cs.s
        break
      }
    }

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1]
      os = 'Windows'
    }

    switch (os) {
      case 'Mac OS X':
        osVersion = /Mac OS X (10[._\d]+)/.exec(navigatorAgent)[1]
        break

      case 'Android':
        osVersion = /Android ([._\d]+)/.exec(navigatorAgent)[1]
        break

      case 'iOS':
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigatorVer)
        osVersion = `${osVersion[1]}.${osVersion[2]}.${osVersion[3] || 0}`
        break

      default:
        break
    }

    return `${os} ${osVersion || ''}`.trim()
  },

  /**
   * Get device
   * @return {string}
   */
  getDevice() {
    switch (true) {
      case isMobile.phone: {
        return 'mobile'
      }
      case isMobile.tablet: {
        return 'tablet'
      }
      default: {
        return 'desktop'
      }
    }
  },
}

export default Detect
