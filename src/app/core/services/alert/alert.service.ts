import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public async confirmModal(title: string, text: string){
    const confirm = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    })

    return confirm?.isConfirmed;
  }

  public successAlert(title: string) {
    Swal.fire({
      title,
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
      customClass: {
        title: 'alert-success-title'
      }
    })
  }

  public errorAlert(title: string) {
    Swal.fire({
      title,
      icon: 'error',
      showConfirmButton: true,
      customClass: {
        title: 'alert-success-title'
      }
    })
  }
}
