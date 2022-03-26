import {useEffect, useRef} from "react";

const useObserver = (ref, callback) => {
    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        if (ref.current) {
            observer.current = new IntersectionObserver(callback);
            observer.current.observe(ref.current);
        }
    }, [callback, ref]);

    return ref;
}

export default useObserver;