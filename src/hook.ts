import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocalStorage as useClientOnlyLocalStorage } from 'usehooks-ts';

const useLocalStorage = <T>(
    key: string,
    initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
    const [firstRender, setFirstRender] = useState(true);
    const [storedValue, setStoredValue] = useClientOnlyLocalStorage(
        key,
        initialValue,
    );

    useEffect(() => {
        setFirstRender(false);
    }, []);

    return [firstRender ? initialValue : storedValue, setStoredValue];
};

export default useLocalStorage;
