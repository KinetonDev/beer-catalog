import {useEffect, useRef} from "react";

const useObserver = (ref, callback) => {
    const observer = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (observer.current) {
                observer.current.disconnect();
            }
            if (ref.current) {
                observer.current = new IntersectionObserver(callback);
                observer.current.observe(ref.current);
            }
        }, 500);

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        }
    }, [callback, ref]);
}

export default useObserver;