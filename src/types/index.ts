export interface Files extends FileList {
    forEach(callback: (f: File) => void) : void
}