import LibraryManager from './libraryManager';

const loadedLibrary = LibraryManager.loadLocalLibrary();
LibraryManager.createLibrary(loadedLibrary);
