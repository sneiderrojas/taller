import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  UtilsSvc = inject(UtilsService);

  // ============== AUTENTIFICACION ================
  getAuth() {
    return getAuth();
  }

  // ============== ACCEDER ================

  signIn(user: User) {

    return signInWithEmailAndPassword(getAuth(), user.email, user.password);


  }

  // ============== Crear usuario ================

  signUp(user: User) {

    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);


  }
  // ============== Actualizar usuario ================
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

  // ============== enviar un email para restablecer contraseña ================

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // ============== cerrar sesion< ================

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.UtilsSvc.routerLink('/auth');
  }


  // ========================= BD ============================

  //===== obtener un docuemneto de una coleccion ====

  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
  }




  // ============== setear un doc ================

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }



  // ============== actualizar un doc ================

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

 // ============== delete docuemnto ================

 deleteDocument(path: string) {
  return deleteDoc(doc(getFirestore(), path));
}

  // =========== obtener datod de un docuemnto ========
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }



  // ============== add docuemnto ================

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  
   
  

  // ============== almacenamiento ================

  // ======== subir imagen ==========
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })

  }

  async  getFilePath(url: string){
    return ref(getStorage(), url).fullPath
  }


  deleteFile(path: string){
return deleteObject(ref(getStorage(), path));
  }


}
