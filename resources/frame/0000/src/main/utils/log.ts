import { is } from '@electron-toolkit/utils'
import { app } from 'electron'
import fs from 'fs'
import moment from 'moment'
import path from 'path'

const LOG_LEVEL = 'DEBUG'

type Logger = (category: string) => Log
interface Log {
  debug(...args: unknown[]): void
  info(...args: unknown[]): void
  warn(...args: unknown[]): void
  error(...args: unknown[]): void
}

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
}
const LOG_LEVEL_INDEX = LOG_LEVELS[LOG_LEVEL]

/**
 * 创建文件日志
 * @param level
 * @returns
 */
function createFileLogger(level: string): Logger {
  const queue: string[] = []

  async function flush(): Promise<void> {
    while (queue.length) {
      const msg = queue[0]
      await fs.writeFile(
        path.join(app.getPath('userData'), 'log.txt'),
        msg,
        { flag: 'a' },
        () => {}
      )
      queue.shift()
    }
  }

  function log(level: string, category: string, args: unknown[]): void {
    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    const msg = `[${date}][${level}] ${category} - ${args.join(' ')}\n`
    queue.push(msg)
    if (queue.length === 1) {
      flush()
    }
  }

  return function (category: string) {
    return {
      debug:
        LOG_LEVELS['DEBUG'] >= LOG_LEVEL_INDEX
          ? (...args: unknown[]): void => log('DEBUG', category, args)
          : (): void => {},
      info:
        LOG_LEVELS['INFO'] >= LOG_LEVEL_INDEX
          ? (...args: unknown[]): void => log('INFO', category, args)
          : (): void => {},
      warn:
        LOG_LEVELS['WARN'] >= LOG_LEVEL_INDEX
          ? (...args: unknown[]): void => log('WARN', category, args)
          : (): void => {},
      error:
        LOG_LEVELS['ERROR'] >= LOG_LEVEL_INDEX
          ? (...args: unknown[]): void => log('ERROR', category, args)
          : (): void => {}
    }
  }
}

function createConsoleLogger(level: string): Logger {
  const styles = {
    DEBUG: ['\x1B[36m', '\x1B[39m'],
    INFO: ['\x1B[32m', '\x1B[39m'],
    WARN: ['\x1B[33m', '\x1B[39m'],
    ERROR: ['\x1B[31m', '\x1B[39m']
  }

  const colors: Record<string, (str: string) => string> = {}
  for (const i in styles) {
    colors[i] = function (str: string): string {
      return `${styles[i][0]}${str}${styles[i][1]}`
    }
  }

  function log(level: string, category: string, args: unknown[]): void {
    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    const header = colors[level](`[${date}][${level}] ${category}`) + ' - '
    const msg = [header, ...args]
    console.log(...msg)
  }

  return function (category: string) {
    return {
      debug:
        LOG_LEVELS['DEBUG'] >= LOG_LEVEL_INDEX
          ? (...args: unknown[]): void => log('DEBUG', category, args)
          : (): void => {},
      info:
        LOG_LEVELS['INFO'] >= LOG_LEVEL_INDEX
          ? (...args: unknown[]): void => log('INFO', category, args)
          : (): void => {},
      warn:
        LOG_LEVELS['WARN'] >= LOG_LEVEL_INDEX
          ? (...args: unknown[]): void => log('WARN', category, args)
          : (): void => {},
      error:
        LOG_LEVELS['ERROR'] >= LOG_LEVEL_INDEX
          ? (...args: unknown[]): void => log('ERROR', category, args)
          : (): void => {}
    }
  }
}

// function createNullLogger(level: string): Logger {
//   return function () {
//     return {
//       debug: (): void => {},
//       info: (): void => {},
//       warn: (): void => {},
//       error: (): void => {}
//     }
//   }
// }

let logger: Logger
if (is.dev) {
  logger = createConsoleLogger(LOG_LEVEL)
} else {
  logger = createFileLogger(LOG_LEVEL)
}

export function getLogger(category: string): Log {
  return logger(category)
}
