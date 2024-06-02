const choosenActors = [];

const actorSocialLinks = actor => actor['contacts'].map(link => {
    const linkWrapper = document.createElement('li')

    const aLink = document.createElement('a');
    aLink.href = link;
    aLink.target = '_blank';
    
    const linkImg = document.createElement('img');
    linkImg.alt = link;
    linkImg.src = determineImage(link);
    
    aLink.append(linkImg);
    linkWrapper.append(aLink);
    return linkWrapper;
});

function createActorItem(actor) {
    const wrapper = document.createElement('li');
    wrapper.classList.add('actor-wrapper');
    
    const item = document.createElement('a');
    item.href = '#';
    item.classList.add('actor-item');

    item.addEventListener('click', () => {
        if (!choosenActors.includes(actor)) {
            choosenActors.push(actor);
            refreshHTMLList();
        }
    });

    item.dataset.actorId = actor['id']
    
    const actorFullname = `${actor['firstName']} ${actor['lastName']}`;
    
    const actorImage = document.createElement('img');
    actorImage.classList.add('actor-item__image');
    actorImage.src = actor['profilePicture'];

    const actorAnonimImage = document.createElement('img');
    actorAnonimImage.classList.add('actor-item__anonim-image');
    actorAnonimImage.src = 'img/3550773.jpg';
    
    const actorName = document.createElement('p');
    actorName.classList.add('actor-item__name');
    actorName.innerText = actorFullname;
    
    const actorContacts = document.createElement('ul');
    actorContacts.classList.add('actor-item__social-medias');
    
    const HTMLContactList = actorSocialLinks(actor);
    actorContacts.append(...HTMLContactList);
    
    item.append(actorImage, actorAnonimImage, actorName, actorContacts);
    wrapper.append(item);
    
    return wrapper;
}

function showChoosenActor(actor) {
    const wrapper = document.createElement('li');
    wrapper.classList.add('choosen-wrapper');

    const item = document.createElement('div');
    item.classList.add('choosen-item');

    const actorFullname = `${actor['firstName']} ${actor['lastName']}`;
    const actorInitials = actor['firstName'][0] + actor['lastName'][0];
    
    const photo = document.createElement('img');
    photo.classList.add('choosen-item__image');
    photo.src = actor['profilePicture'];

    const anonimPhoto = document.createElement('img');
    anonimPhoto.classList.add('choosen-item__anonim-image');
    anonimPhoto.src = 'img/3550773.jpg';

    const name = document.createElement('p');
    name.classList.add('choosen-item__name');
    name.innerText = actorFullname;

    const contacts = document.createElement('ul');
    contacts.classList.add('choosen-item__social-medias');

    const HTMLContactList = actorSocialLinks(actor);
    contacts.append(...HTMLContactList);

    const deleteButton = document.createElement('a');
    deleteButton.classList.add('item-delete');
    deleteButton.href = '#';
    deleteButton.addEventListener('click', () => {
        choosenActors.splice(choosenActors.indexOf(actor), 1);
        refreshHTMLList();
    });

    const trashImage = document.createElement('img');
    trashImage.src = 'img/bin.png';
    trashImage.alt = 'delete';
    deleteButton.append(trashImage);

    item.append(photo, anonimPhoto, name, contacts, deleteButton);
    wrapper.append(item);
    return wrapper;
}

function determineImage(link = "") {
    const facebookIcon = "img/5282541_fb_social media_facebook_facebook logo_social network_icon.png";
    const instagramIcon = "img/5282544_camera_instagram_social media_social network_instagram logo_icon.png";
    const twitterIcon = "img/5282551_tweet_twitter_twitter logo_icon.png";
    
    return link.includes('facebook') ? facebookIcon : link.includes('instagram') ? instagramIcon
        : link.includes('twitter') ? twitterIcon : "";
}

function refreshHTMLList() {
    const choosenList = document.getElementById('choosen-list');
    choosenList.innerHTML = '';
    const HTMLChoosenActors = choosenActors.map(actor => showChoosenActor(actor));
    choosenList.append(...HTMLChoosenActors);
}

const actorsList = document.getElementById('actors-list');
const HTMLActorItems = actors.map(actor => createActorItem(actor));
actorsList.append(...HTMLActorItems);
