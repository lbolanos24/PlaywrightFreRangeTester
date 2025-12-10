import { test, Browser, Page, expect } from '@playwright/test';

(async () =>{
    let browser: Browser;
    let page: Page;
    let textoAEscribir: string = 'Estoy aprendiendo PW';

    test.describe('Acciones en el Automation sandbox', () => {
        test('Click en Boton Id dinamico', async ({ page }) => {
            await test.step('Navego a la pagina de sandbox de FreeRangeTesters', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('Puedo hacer click en el boton con Id dinamico', async () => {
                //await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
                const botonIdDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
                await botonIdDinamico.click({ force:true });
                await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
            })
        })
        
        test('Llenar campo de texto en automation sandbox', async ({ page }) => {
            await test.step('Navego a la pagina de sandbox de FreeRangeTesters', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await expect(page.getByPlaceholder('Ingresá texto'),'El campo de texto no permite edicion').toBeEditable();
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
                await expect(page.getByPlaceholder('Ingresá texto'),'El campo de texto no permite edicion').toHaveValue(textoAEscribir);
            })    
        })

        test('Puedo seleccionar y desseleccionar check boxes', async ({ page, browserName }) => {
            test.skip(browserName === 'chromium', 'no anda en chrome todavia');
            await test.step('Navego a la pagina de sandbox de FreeRangeTesters', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('Puedo seleccionar check box para pasta', async () => {
                await page.getByLabel('Pasta 🍝').check();
                await expect(page.getByLabel('Pasta 🍝'),'El chekbox no estaba seleccionado').toBeChecked();
            })    
            await test.step('Puedo deseleccionar check box para pasta', async () => {
                 await page.getByLabel('Pasta 🍝').uncheck();
                await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked();
            })
            
        })
        
        test('Puedo seleccionar radio Buttons', async ({ page }) => {
            await test.step('Navego a la pagina de sandbox de FreeRangeTesters', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('Puedo seleccionar Radio Button para NO', async () => {
                await page.getByLabel('No').check();
                await expect(page.getByLabel('No'),'El radio button no se selecciono').toBeChecked();
            })
        })

        test('Puedo seleccionar Un item del Dropdown', async ({ page }) => {
            test.info().annotations.push({
                type:'bug',
                description:'esto va a informar que el caso de prueba tiene un bug'
            });
            await test.step('Navego a la pagina de sandbox de FreeRangeTesters', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('Valido que la lista contiene los valores esperados', async () => {
                const deportes = ['Fútbol','Tennis','Basketball'];
                
                for(let opcion of deportes){
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if(element){
                        console.log(`La opción '${opcion}' está presente.`);
                    }else {
                        throw new Error(`La opción '${opcion}' no está presente.`)
                    }
                }
                
                //await expect(dropDownDeportes,'El dropdown no contiene los valores').toHaveValues();
            })
            
            await test.step('Selecciono un deporte del dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Tennis');
            })
        })

        test('Puedo seleccionar un item del dropdown dias de la semana', async ({ page }) => {
            await test.step('Navego a la pagina de sandbox de FreeRangeTesters', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('selecciono un dia de la semana del dropdown', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Martes' }).click();
            })
        })

        test.skip('Puedo Subir archivos', async ({ page }) => {
            await test.step('Navego a la pagina de sandbox de FreeRangeTesters', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('Agrego archivos para ser subidos', async () => {
                await page.getByLabel('Upload File').setInputFiles(['pathAlachivo.pdf','Archivo2.pdf']);
                await page.getByLabel('Upload File').setInputFiles([]);
            })
        })

        test.skip('Puedo hacer drag and drop', async ({ page }) => {
            await test.step('Navego a la pagina de sandbox de FreeRangeTesters', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('selecciono un dia de la semana del dropdown', async () => {
                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));
            })
        })

        test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
            await test.info().attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png',
            })
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

                await test.info().attach('screenshot',{
                    body: await page.screenshot(),
                    contentType: 'image/png'
                })
                
                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
        })

        test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('/sandbox-automation-testing/')
            })
            await test.step('Puedo validar los valores cambiaron al hacer reload', async () => {
                //Creamos un arreglo con todos los valores de la tabla dinámica
                const valorestablaDinamica =await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valorestablaDinamica);
                //Hacemos una recarga para que cambien los valores
                await page.reload();
                //Creamos un segundo arreglo con los valores luego de la recarga
                const valoresPostReload =await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);
                //Validamos que todos los valores cambiaron para cada celda.
                expect(valorestablaDinamica).not.toEqual(valoresPostReload);
            })
        })

        test('Ejemplo de Soft Assertions', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('/sandbox-automation-testing/');
            })
            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
            })
        })

        test('Validando dentro de un popup', async ({ page }) => {
            await test.step('Dado que navego al sandbox', async () => {
                await page.goto('/sandbox-automation-testing/');
            })
            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })
            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
            })
        })
        
    })
})();