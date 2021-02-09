
var app = new Vue({
    el: "#app",
    data: {
        datos: [],
        message: ''
    },

    methods: {
        getDatos() {
            let url = '/api/datosp';
            axios.get(url).then(response=>{
                console.log(response.data);
                this.datos = response.data;
            });
        },

        nuevoDato() {
          console.log('Nuevo Dato');

          Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
          }).queue([

            {
              title: 'Digite su nombre',
              text:  'Nombre y Apellido',
              input: 'text',
              inputValidator: (value) => {
                if (!value) {
                  toastr.error('Debe ingresar un nombre', 'error');
                  return ' '
                }
              }
            },
            {
              title: 'Selecciona su posición',
              text:  'Posicíon del empleado',
              input: 'select',
                inputOptions: {
                    Auditor: 'Auditor',
                    Soporte: 'Soporte',
                    Seguridad: 'Seguridad',            
                },
                inputPlaceholder: 'Selecciona una posición',
                inputValidator: (value) => {
                  if (!value) {
                    toastr.error('Debe seleccionar uno', 'error');
                    return ' '
                  }
                }
            },

            {
              title: 'Ingrese el salario',
              text:  'Este campo acepta decimales',
              input: 'number',
              inputAttributes: {
                min: 4,
                step: 0.01
              },
              inputValidator: (value) => {
                if (!value) {
                  toastr.error('Debe ingresar el salario', 'error');
                  return ' '
                }
              }
            },

          ]).then( async (result) => {
            if (result.value) {

              datos = {
                name     : result.value[0],
                position : result.value[1],
                salary   : result.value[2], 

              }

              //console.log(datos);

              let url = '/api/datosp';
              await axios.post(url, datos).then(response=>{
                  console.log(response.data);
                  this.mensaje = response.data;
              });

              this.getDatos();
                toastr.success(this.mensaje);
            }
          })

        },

        eliminarDato(dato) {
          console.log(dato);

          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Estas Seguro?',
            html: "Estas seguro de elimiar el  registro <strong>" + dato.name + "</strong>, <br>¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar!',
            cancelButtonText: 'Cancelar!',
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            reverseButtons: true
          }).then( async (result) => {
            if (result.value) {

              let url = '/api/datosp/'+dato.id;
              await axios.delete(url).then(response=>{
                  console.log(response.data);
                  this.mensaje = response.data;
              });

              this.getDatos();
                toastr.success(this.mensaje);

            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              toastr.error('Acción cancelada!');
            }
          })



        },


        editarDato(dato) {
          console.log(dato);

          formulario = 
          '<div id="swal2-content" class="swal2-html-container" style="display: block;">Nombre y apellido</div>'+
          '<input id="name" name="name" class="swal2-input" placeholder="" type="text" style="display: flex;">'+

          '<div id="swal2-content" class="swal2-html-container" style="display: block;">Posicion de este empleado</div>'+
          '<select id="position" name="position" class="swal2-select" style="display: flex;"><option value="" disabled="">Selecciona una posicion</option><option value="Auditor">Auditor</option><option value="Soporte">Soporte</option><option value="Seguridad">Seguridad</option></select>'+

          '<div id="swal2-content" class="swal2-html-container" style="display: block;">Salario</div>'+
          '<input id="salary" name="salary" min="4" step="0.01" class="swal2-input" placeholder="" type="number" style="display: flex;">';


           Swal.fire({
              title: 'Editar registro',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancelar!',
              confirmButtonText: 'Guardar',
              html: formulario,
              focusConfirm: false,
              preConfirm: async () => {

                ultimosdatoseditados = {
                  name:      document.getElementById('name').value,
                  position:  document.getElementById('position').value, 
                  salary:    document.getElementById('salary').value,            
                };

                let url = '/api/datosp/'+dato.id;
                await axios.put(url, ultimosdatoseditados).then(response=>{
                    console.log(response.data);
                    this.mensaje=response.data;
                });

                this.getDatos();                  
               
              return toastr.success(this.mensaje);
            }
            })  

            document.getElementById('name').value      = dato.name;
            document.getElementById('position').value  = dato.position;
            document.getElementById('salary').value    = dato.salary;

          }

    },

    mounted() {
        this.getDatos();
    }

})
