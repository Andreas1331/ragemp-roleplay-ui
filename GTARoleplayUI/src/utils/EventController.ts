interface EventControllerType {
    events: { [key: string]: Array<(args: unknown) => void> };
    addListener: (eventName: string, listener: (args: unknown) => void) => void;
    removeListener: (eventName: string, listener: (args: unknown) => void) => void;
}

const EventController: EventControllerType = {
    events: {},

    addListener(eventName: string, listener: (args: unknown) => void) {
        // Use nullish coalescing to initialize the event listener array if undefined
        this.events[eventName] = this.events[eventName] ?? [];
        this.events[eventName].push(listener);
    },

    removeListener(eventName: string, listener: (args: unknown) => void) {
        if (eventName in this.events) {
            const index = this.events[eventName].indexOf(listener);
            if (index > -1) {
                this.events[eventName].splice(index, 1);
            }
            // Clean up event key if no listeners remain
            if (this.events[eventName].length === 0) {
                delete this.events[eventName];
            }
        }
    }
};

function invokeEvent(eventName: string, args: string) {
    const listeners = EventController.events[eventName];
    if (!listeners || listeners.length === 0) return;

    let parsedArgs: unknown = args;

    // Only parse arguments for certain event types
    if (!["show", "hide", "toggle"].includes(eventName)) {
        try {
            parsedArgs = JSON.parse(args);  // Try parsing the argument if not a direct string
        } catch (e) {
            console.error(`Failed to parse args for event "${eventName}":`, e);
        }
    }

    listeners.forEach(listener => listener(parsedArgs));
}

export { EventController, invokeEvent };
