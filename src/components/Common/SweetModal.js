import Swal from 'sweetalert2';
import 'animate.css';

const Toast = () => {
    return Swal.mixin({
        toast: true,
        showConfirmButton: false,
        customClass : { container: 'ml-popup', popup : 'hover-popup'},
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        }
    })
}

const deleteModal = () => {
    return Swal.mixin({
        // toast: true,
        backdrop : true,
        title : 'Attention',
        text: 'Voulez vous vraiment supprimer ?',
        icon: 'warning',
        buttonsStyling: false,
        customClass : { 
            popup : 'swal-sm', 
            confirmButton : 'btn btn-danger btn-sm',
            cancelButton : 'btn btn-secondary btn-sm'
        },
        confirmButtonText : 'Confirmer', 
        cancelButtonText : 'Annuler', 
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showLoaderOnConfirm: true,
    })
}

const errorModal = (err) => {
    if (err.response.data) {
        Toast().fire({title: err.response.data.message, icon:'error'})
    } else Toast().fire({
        title: "Erreur survenue au serveur",
        html : `Veuillez contacter l'administrateur`,
        icon:'error'
    })
}

/*const errorModal = (err) => {
    const modal = Swal.mixin({
        icon: 'error',
        buttonsStyling: false,
        customClass : { popup : 'swal-sm', confirmButton : 'btn btn-danger' }
    });
    if (err.response.data) {
        modal.fire({html: err.response.data.message})
    } else modal.fire({html: "Erreur survenue au serveur <br/> Veuillez contacter l'administrateur."})
}*/

export { deleteModal, errorModal ,Toast } 
