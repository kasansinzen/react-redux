import Swal from 'sweetalert2';

export let swalToast = (swalTimer = 3000) => {
  return Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: swalTimer,
    timerProgressBar: true
  });
}

export let swalToastAlert = (statusSwal, titleSwal, onDone) => {
  swalToast().fire({
    icon: statusSwal ? 'success' : 'error',
    title: titleSwal,
    onClose: () => {
      if(!statusSwal) return false;
      onDone();
    }
  });
}