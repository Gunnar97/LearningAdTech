const modules = ['/src/debugHighlight.js']


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
                // return 'import "/src/debugHighlight.js"'
                return modules.map((module) => `import '${module}';`).join('\n');
            }
            return null;
        },
    };
}