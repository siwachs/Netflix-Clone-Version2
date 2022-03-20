import { db } from "../utils/config";
import {
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  collection,
} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";

export const useSubscription = () => {
  const loadCheckout = async (priceId, userId) => {
    const reference = collection(db, `customers/${userId}/checkout_sessions`);
    const get = await getDocs(reference);
    get.forEach(async (document) => {
      const ref = doc(
        db,
        `customers/${userId}/checkout_sessions/${document.id}`
      );
      await deleteDoc(ref);
    });

    const docRef = await addDoc(
      collection(db, `customers/${userId}/checkout_sessions`),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    const ref = collection(db, `customers/${userId}/checkout_sessions`);
    const snap = onSnapshot(
      ref,
      { includeMetadataChanges: true },
      async (doc) => {
        let error = null,
          sessionId = null;
        doc.forEach((ele) => {
          error = ele.data().error;
          sessionId = ele.data().sessionId;
        });
        if (error) {
          alert(error);
        }
        if (sessionId) {
          const stripe = await loadStripe(
            process.env.REACT_APP_STRIPE_PUBLIC_API
          );
          stripe.redirectToCheckout({ sessionId });
        }
      }
    );
  };

  return { loadCheckout };
};
