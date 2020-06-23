import path from 'path'

export const Resolve = (...args: string[]) => {
  return path.resolve(__dirname, '../../', ...args)
}
