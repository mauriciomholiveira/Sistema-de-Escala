document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addVolunteer').addEventListener('click', addVolunteer);
    document.getElementById('addUnavailability').addEventListener('click', addUnavailability);
    document.getElementById('addEvent').addEventListener('click', addEvent);
    document.getElementById('volunteerForm').addEventListener('submit', generateSchedule);
});

function addVolunteer() {
    const volunteerContainer = document.getElementById('volunteers');
    const volunteerCount = volunteerContainer.children.length + 1;
    const volunteerField = `
        <div class="volunteer">
            <label for="volunteerName${volunteerCount}">Nome:</label>
            <input type="text" id="volunteerName${volunteerCount}" name="volunteerName" required>

            <fieldset>
                <legend>Funções</legend>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="volunteerRoles${volunteerCount}" value="fotografo"> Fotógrafo</label>
                    <label><input type="checkbox" name="volunteerRoles${volunteerCount}" value="videomaker"> Videomaker</label>
                    <label><input type="checkbox" name="volunteerRoles${volunteerCount}" value="streaming"> Streaming</label>
                    <label><input type="checkbox" name="volunteerRoles${volunteerCount}" value="iluminacao"> Iluminação</label>
                    <label><input type="checkbox" name="volunteerRoles${volunteerCount}" value="projecao"> Projeção</label>
                </div>
            </fieldset>

            <fieldset>
                <legend>Disponibilidade</legend>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="volunteerAvailability${volunteerCount}" value="manha"> Manhã</label>
                    <label><input type="checkbox" name="volunteerAvailability${volunteerCount}" value="tarde"> Tarde</label>
                    <label><input type="checkbox" name="volunteerAvailability${volunteerCount}" value="noite"> Noite</label>
                    <label><input type="checkbox" name="volunteerAvailability${volunteerCount}" value="dia_todo"> Dia Todo</label>
                </div>
            </fieldset>

            <fieldset>
                <legend>Dias da Semana</legend>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="volunteerDays${volunteerCount}" value="segunda"> Segunda</label>
                    <label><input type="checkbox" name="volunteerDays${volunteerCount}" value="terca"> Terça</label>
                    <label><input type="checkbox" name="volunteerDays${volunteerCount}" value="quarta"> Quarta</label>
                    <label><input type="checkbox" name="volunteerDays${volunteerCount}" value="quinta"> Quinta</label>
                    <label><input type="checkbox" name="volunteerDays${volunteerCount}" value="sexta"> Sexta</label>
                    <label><input type="checkbox" name="volunteerDays${volunteerCount}" value="sabado"> Sábado</label>
                    <label><input type="checkbox" name="volunteerDays${volunteerCount}" value="domingo"> Domingo</label>
                </div>
            </fieldset>

            <button type="button" class="remove-button">Remover</button>
        </div>
    `;
    volunteerContainer.insertAdjacentHTML('beforeend', volunteerField);
    const removeButtons = document.querySelectorAll('#volunteers .remove-button');
    removeButtons.forEach(button => button.addEventListener('click', () => button.parentElement.remove()));
}

function addUnavailability() {
    const unavailabilityContainer = document.getElementById('unavailabilities');
    const unavailabilityCount = unavailabilityContainer.children.length + 1;
    const unavailabilityField = `
        <div class="unavailability">
            <label for="unavailableName${unavailabilityCount}">Nome:</label>
            <input type="text" id="unavailableName${unavailabilityCount}" name="unavailableName">

            <label for="unavailableDate${unavailabilityCount}">Data:</label>
            <input type="text" id="unavailableDate${unavailabilityCount}" name="unavailableDate" placeholder="DD/MM/YYYY">

            <button type="button" class="remove-button">Remover</button>
        </div>
    `;
    unavailabilityContainer.insertAdjacentHTML('beforeend', unavailabilityField);
    const removeButtons = document.querySelectorAll('#unavailabilities .remove-button');
    removeButtons.forEach(button => button.addEventListener('click', () => button.parentElement.remove()));
}

function addEvent() {
    const eventContainer = document.getElementById('events');
    const eventCount = eventContainer.children.length + 1;
    const eventField = `
        <div class="event">
            <label for="eventName${eventCount}">Evento:</label>
            <input type="text" id="eventName${eventCount}" name="eventName">

            <label for="eventDate${eventCount}">Data:</label>
            <input type="text" id="eventDate${eventCount}" name="eventDate" placeholder="DD/MM/YYYY">

            <fieldset>
                <legend>Funções Necessárias</legend>
                <label>Fotógrafo: <input type="number" name="eventFotografo${eventCount}" value=""></label><br>
                <label>Videomaker: <input type="number" name="eventVideomaker${eventCount}" value=""></label><br>
                <label>Streaming: <input type="number" name="eventStreaming${eventCount}" value=""></label><br>
                <label>Iluminação: <input type="number" name="eventIluminacao${eventCount}" value=""></label><br>
                <label>Projeção: <input type="number" name="eventProjecao${eventCount}" value=""></label><br>
            </fieldset>

            <button type="button" class="remove-button">Remover</button>
        </div>
    `;
    eventContainer.insertAdjacentHTML('beforeend', eventField);
    const removeButtons = document.querySelectorAll('#events .remove-button');
    removeButtons.forEach(button => button.addEventListener('click', () => button.parentElement.remove()));
}

function generateSchedule(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('volunteerForm'));
    const monthYear = formData.get('monthYear');
    const daysOfWeek = formData.getAll('daysOfWeek');
    const shifts = formData.getAll('shifts');
    const volunteers = [];

    formData.getAll('volunteerName').forEach((name, index) => {
        const roles = formData.getAll(`volunteerRoles${index + 1}`).filter(role => role !== '');
        const availability = formData.getAll(`volunteerAvailability${index + 1}`).filter(ava => ava !== '');
        const days = formData.getAll(`volunteerDays${index + 1}`).filter(day => day !== '');
        volunteers.push({
            name,
            roles,
            availability,
            days
        });
    });

    const unavailabilities = [];
    formData.getAll('unavailableName').forEach((name, index) => {
        const date = formData.getAll('unavailableDate')[index];
        if (name && date) {
            unavailabilities.push({
                name,
                date
            });
        }
    });

    const events = [];
    formData.getAll('eventName').forEach((name, index) => {
        const date = formData.getAll('eventDate')[index];
        const fotografo = formData.get(`eventFotografo${index + 1}`);
        const videomaker = formData.get(`eventVideomaker${index + 1}`);
        const streaming = formData.get(`eventStreaming${index + 1}`);
        const iluminacao = formData.get(`eventIluminacao${index + 1}`);
        const projecao = formData.get(`eventProjecao${index + 1}`);
        events.push({
            name,
            date,
            roles: {
                fotografo,
                videomaker,
                streaming,
                iluminacao,
                projecao
            }
        });
    });

    const weeksInMonth = getWeeksInMonth(monthYear);
    let generatedSchedule = 'Data | Semana | Voluntário | Função | Turno\n';

    const roleQueues = initializeRoleQueues(volunteers);

    weeksInMonth.forEach((week, weekIndex) => {
        week.forEach(date => {
            const dayOfWeek = getDayOfWeek(date);
            if (daysOfWeek.includes(dayOfWeek)) {
                shifts.forEach(shift => {
                    const assignedVolunteers = {};
                    Object.keys(roleQueues).forEach(role => {
                        const volunteer = findAvailableVolunteer(roleQueues[role], dayOfWeek, shift, assignedVolunteers);

                        if (volunteer) {
                            assignedVolunteers[volunteer.name] = role;
                            generatedSchedule += `${formatDate(date)} | ${dayOfWeek} ${weekIndex + 1}ª semana | ${volunteer.name} | ${role} | ${shift}\n`;
                        }
                    });
                });
            }
        });
    });

    document.getElementById('generatedSchedule').value = generatedSchedule;
}

function getWeeksInMonth(monthYear) {
    const [year, month] = monthYear.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    const weeks = [];
    let week = [];

    while (date.getMonth() === month - 1) {
        if (date.getDay() === 0 && week.length) {
            weeks.push(week);
            week = [];
        }
        week.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    if (week.length) weeks.push(week);
    return weeks;
}

function getDayOfWeek(date) {
    const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    return days[date.getDay()];
}

function formatDate(date) {
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function initializeRoleQueues(volunteers) {
    const roleQueues = {
        fotografo: [],
        videomaker: [],
        streaming: [],
        iluminacao: [],
        projecao: []
    };

    volunteers.forEach(volunteer => {
        volunteer.roles.forEach(role => {
            roleQueues[role].push(volunteer);
        });
    });

    return roleQueues;
}

function findAvailableVolunteer(queue, dayOfWeek, shift, assignedVolunteers) {
    for (let i = 0; i < queue.length; i++) {
        const volunteer = queue[i];
        if (volunteer.days.includes(dayOfWeek) && 
            (volunteer.availability.includes(shift) || volunteer.availability.includes('dia_todo')) &&
            !assignedVolunteers[volunteer.name]) {
            queue.push(queue.shift());  // Rotate the queue
            return volunteer;
        }
    }
    return null;
}
