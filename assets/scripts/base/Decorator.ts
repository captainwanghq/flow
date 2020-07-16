const custom_decorator = 
{
    //自动加载
    auto(moduleName?: string, moduleIndex?: number) {
        return function (target, methodName: string, paramIndex: number) {
            if (!moduleName) {
                console.warn("that is not set @gModule('?????')", target);
                moduleName = target.instance.moduleName;
            };
            if (!moduleIndex) moduleIndex = target.instance.moduleIndex;
            target.instance.moduleName = moduleName;
            target.instance.moduleIndex = moduleIndex;
            // gdk_module_manger.add(moduleName, target);
        }
    },
    // 绑定数据
    mvvm(type) {
        return function (target, name, descriptor) {
            let temp;
            Object.defineProperty(target, name, {
                ...descriptor,
                set: (val) => {
                    temp = val;
                    // gdk_center.emit(gdk_autoRun.moduleName, type, val);
                },
                get: () => {
                    return temp;
                }
            })
        }
    }
}


export default custom_decorator