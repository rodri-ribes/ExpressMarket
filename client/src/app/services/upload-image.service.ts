import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { initializeApp } from "firebase/app";
import { IdGenerateService } from './id-generate.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  firebaseConfig = {
    apiKey: "AIzaSyC_VFDhlKM-XXgeQCLOzdOkrhTvainBdtI",
    authDomain: "ecommerce-angular-ribes.firebaseapp.com",
    projectId: "ecommerce-angular-ribes",
    storageBucket: "ecommerce-angular-ribes.appspot.com",
    messagingSenderId: "173802719713",
    appId: "1:173802719713:web:b5b2082b720b27ba132aa0"
  };

  app = initializeApp(this.firebaseConfig);

  storage = getStorage(this.app)

  constructor(private id: IdGenerateService) { }

  async uploadFile(file: any): Promise<string[]> {
    
    let name = this.id.generate()
    console.log("id", name)

    const storageRef = ref(this.storage, name)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef);

    return [name, url];
  }

  async deleteFile(name: string): Promise<any>  {
    const storageRef = ref(this.storage, name)
    await deleteObject(storageRef)
  }
}
