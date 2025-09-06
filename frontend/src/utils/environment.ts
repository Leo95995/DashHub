// Get current mode
const getMode = () => {
    return import.meta.env.MODE
}

// Production Environment

const isProduction = () => {
    if(getMode() === 'production'){
        return true
    }
    return false
}


// Development environment
const isDevelopment = () => {
    if(getMode() === 'development'){
        return true
    }
    return false
}

export const AppMode =  {
    getMode,
    isProduction,
    isDevelopment
}