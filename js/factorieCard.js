// mon modele pour créer les cartes
// deux parties
// 1ere affichage style css

function factorieCard(recette) {
  function getCardDom() {
    // endroit de mes cartes
    const sectionRecipe = document.getElementById('card_container')

    const cardRecipe = `<div class="card">
                          <div class="bgImg "></div>
                          <div class="infos_recette" >
                            <div>${recette.name}</div>
                            <div><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
                            </svg>
                            ${recette.time}min</div>
                          </div>
                          <div class="description_recette">
                          <ul id="ingredients-${recette.id}"></ul>
                          <div class="descriptif">${
                            recette.description.substring(0, 150) + '...'
                          }</div>
                          </div>
                        </div>`

    sectionRecipe.insertAdjacentHTML('beforeEnd', cardRecipe)
  }
  getCardDom()

  // pour afficher ma liste d'ingredients contenu dans le tableau ingredient
  recette.ingredients.forEach((ingredient) => {
    // je selectionne ingredients st son id
    let listIngredients = document.querySelector('#ingredients-' + recette.id)

    let elIngredient = ingredient.ingredient
    let elQuantinty = ingredient.quantity
    let elUnit = ingredient.unit

    // consitions d'affichage si défini ou non
    // si pas de quantité, quantité vide
    if (elQuantinty == undefined) {
      elQuantinty = ''
    }
    // si pas d'unité
    // unité vide
    if (elUnit == undefined) {
      elUnit = ''
    }

    const liste = `<li><strong>${elIngredient}</strong> : ${elQuantinty} ${elUnit} </li>`

    // j'integre mtn ma variable liste dans listIngredient
    listIngredients.insertAdjacentHTML('beforeend', liste)
  })
}

export function displayRecipes(allRecipes) {
  const sectionRecipe = document.getElementById('card_container')
  sectionRecipe.innerHTML = ''

  if (allRecipes.length === 0) {
    sectionRecipe.classList.remove('card_container')
    sectionRecipe.innerHTML = `Aucune recette ne correspond à votre critère… Vous pouvez
    chercher « tarte aux pommes », « poisson », etc ...`
    sectionRecipe.classList.add('errorMessage')
  } else {
    sectionRecipe.classList.add('card_container')
    sectionRecipe.classList.remove('errorMessage')
  }

  allRecipes.forEach((recette) => {
    factorieCard(recette)
  })
}

export function displayDropDown(tabThings, elementCategory, color, type) {
  // drop visible
  if (!elementCategory.classList.contains('noshow')) {
    elementCategory.innerHTML = `${tabThings
      .map(
        (element) => `
    <li class="list" data-type="${type}">${element}</li>`
      )
      .join(' ')}`
    elementCategory.classList.remove('noshow')
  } else {
    // drop hidden
    elementCategory.classList.add('noshow')
    elementCategory.textContent = ''
  }
}

// export function createTag() {
//   // 1. je selectionne un element dans la liste du dropdown
//   // 2. je crée le tag en css (suivant le data type)

//   const allLi = document.querySelectorAll('.list')
//   const zoneTag = document.querySelector('.zoneTag')

//   allLi.forEach((li) => {
//     li.addEventListener('click', () => {
//       // console.log('click')
//       const tag = document.createElement('div')
//       // au click sur un li je crée un tag avec les propriétés suivantes
//       tag.classList.add(
//         'flex',
//         'gap-3',
//         'items-center',
//         'tagCreated',
//         'inline-block',
//         'px-5',
//         'py-2',
//         'text-white',
//         'rounded',
//         'mr-2'
//       )
//       tag.textContent = li.textContent
//       tag.innerHTML += '<i class="far fa-times-circle" id="cross"></i>'
//       console.log(li.textContent)
//       // différences de tag suivant le data-type
//       if (li.dataset.type === 'ingredient') {
//         tag.classList.add('bg-blue-500')
//         tag.setAttribute('data-type', 'ingredient')
//         // console.log('ingredient')
//         //li.classList.add('text-slate-400', 'italic')
//       } else if (li.dataset.type === 'appareil') {
//         tag.classList.add('bg-green-500')
//         tag.setAttribute('data-type', 'appareil')
//         //li.classList.add('text-slate-400', 'italic')
//         //  console.log('appareil')
//       } else if (li.dataset.type === 'ustensil') {
//         tag.classList.add('bg-red-500')
//         tag.setAttribute('data-type', 'ustensil')
//         //li.classList.add('text-slate-400', 'italic')
//         // console.log('ustensile')
//       }
//       // j'ajoute mon tag dans ma zoneTag
//       zoneTag.appendChild(tag)
//     })
//   })
// }

// export function removeTag() {
//   let tagClose = document.querySelectorAll('#cross')

//   tagClose.forEach((tag) =>
//     // au clic de la croix sur un tag
//     tag.addEventListener('click', () => {
//       let resultat = tag.parentNode.textContent
//       console.log('resultat:', resultat)
//       tag.parentNode.remove()
//       tag.classList.remove('tagCreated')
//     })
//   )
// }
