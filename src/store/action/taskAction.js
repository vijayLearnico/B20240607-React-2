const createNewTask = (data) => {
    return {
        type : 'ADD-NEW-TASK',
        data: data
    }
}

const ModifyExistingTask = (data) => {
    return {
        type : 'MODIFY-TASK',
        data: data
    }
}

export {createNewTask,ModifyExistingTask};