import { onValue, ref, off, update } from 'firebase/database';
import { database } from '../../firebase'

class firebaseService {

    readSensorData(setSignalFunction) {
        const signalRef = ref(database, 'semnale');
        onValue(signalRef, (snapshot) => {
            const tempData = snapshot.val();
            if (tempData) {
                setSignalFunction(tempData);
            }
        });

        // Clean up the event listener when the component unmounts
        return () => {
            off(signalRef);
        };
    }
}

export default new firebaseService();
