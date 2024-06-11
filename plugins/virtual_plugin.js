const modules = ['/modules/debugHighlight.modul.js', '/modules/showResultBid/ShowResultBid.modul.jsx']


export function virtualModules(){
    return {
        name: 'virtual-modules',
        resolveId(id) {
            if (id === 'virtual:plugins') {
                return id;
            }
            return null;
        },
        load(id) {
            if (id === 'virtual:plugins') {
                return modules.map((module) => `import '${module}';`).join('\n');
            }
            return null;
        },
    };
}