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


const modal = (title) => {
    return Swal.mixin({
        title,
        customClass : { 
            popup : 'swal-sm', 
            confirmButton : 'btn btn-primary btn-sm no-margin-btn',
            cancelButton : 'btn btn-secondary btn-sm no-margin-btn'
        },
        showCancelButton: true,
        confirmButtonText: '<i class="feather icon-save"></i> Sauvegarder',
        cancelButtonText : '<i class="feather icon-x-circle"></i> Annuler',
        showLoaderOnConfirm: true,
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false
    })
}

const addPrivilege = (title,value) => {
    return modal(title).mixin({
        html:
        `<input id="nom_privilege" name="nom_privilege" placeholder="Nom du privilège" class="form-control mb-1" type="text" value="${value.nom_privilege}">`,
    })
} 

const addGrade = (title,value) => {
    return modal(title).mixin({
        html:
        `<input id="nom_gr" name="nom_gr" placeholder="Nom du grade" class="form-control mb-1" type="text" value="${value.nom_gr}">`,
    })
} 

const addFonction = (title,value) => {
    const services = value.services
    let options = ``
    for (let i = 0; i < services.length; i++) {
        options += `<option value="${services[i].id}">${services[i].nom_sc}</option>`
    }
    return modal(title).mixin({
        html:
        `<input id="nom_fn" name="nom_fn" placeholder="Nom du grade" class="form-control mb-2" type="text" value="${value.nom_fn}">
         <select id="service_id" class="form-control mb-1">${options}</select>`,
    })
} 

const addService = (title,value) => {
    return modal(title).mixin({
        html:
        `<input id="code_sc" name="code_sc" placeholder="Code service" class="form-control mb-2" type="text" value="${value.code_sc}">
        <input id="nom_sc" name="nom_sc" placeholder="Nom service" class="form-control mb-2" type="text" value="${value.nom_sc}">
        <input id="abrev_sc" name="abrev_sc" placeholder="Abréviation service" class="form-control mb-2" type="text" value="${value.abrev_sc}">
        <input id="cur_bur_sc" name="cur_bur_sc" placeholder="Code bureau" class="form-control mb-2" type="text" value="${value.cur_bur_sc}">
        <input id="lieu_bur_sc" name="lieu_bur_sc" placeholder="Lieu" class="form-control mb-2" type="text" value="${value.lieu_bur_sc}">
        <input id="adresse_sc" name="adresse_sc" placeholder="Adresse" class="form-control mb-2" type="text" value="${value.adresse_sc}">
        <input id="mail_sc" name="mail_sc" placeholder="Email" class="form-control mb-2" type="text" value="${value.mail_sc}">
        <input id="tel_sc" name="tel_sc" placeholder="Téléphone" class="form-control mb-2" type="text" value="${value.tel_sc}">
        <input id="tel_2_sc" name="tel_2_sc" placeholder="Autre contact" class="form-control mb-2" type="text" value="${value.tel_2_sc}">
        `,
    })
} 
/*swal({
    title: 'Submit to confirm',
    html:
        '<input id="swal-input1" placeholder="Password" class="form-control mb-1" type="password">
        <div class="mb-3 form-group row">
            <label class="form-label col-form-label col-sm-2">Nom</label>
            <div class="col">
                <div id="nom" class="input-group input-group-sm">
                    <div class="input-group-prepend"><span class="input-group-text"><i class="feather icon-user"></i></span></div>
                    <input name="nom_privilege" placeholder="Nom du privilège" id="nom_privilege" class="form-control mb-1" value="">
                    <div class="text-right invalid-feedback"></div>
                </div>
            </div>
        </div>',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    buttonsStyling: false,
    confirmButtonClass: 'btn btn-primary btn-lg',
    cancelButtonClass: 'btn btn-lg',
    preConfirm: function () {
        return new Promise((resolve, reject) => {
    
                resolve({
                    Password: $('input[placeholder="Password"]').val()
                });
    
    
            });
    },
    allowOutsideClick: false
    }).then(function (result) {
        $.ajax({
            type:'GET',
            data:{'swal-input1':$('input[placeholder="Password"]').val()},
            url:'data.php',
            success:function(data) {
                alert(data);
            }
        });
     }).catch(swal.noop)*/

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

export { deleteModal, errorModal ,Toast, addPrivilege, addGrade,addService,addFonction } 
