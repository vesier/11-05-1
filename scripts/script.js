const shooter = {}

/**
 * Set up
 */
shooter.$container = document.querySelector('.shooter')
shooter.$start = shooter.$container.querySelector('.start')
shooter.$score = shooter.$container.querySelector('.score .value')
shooter.$timer = shooter.$container.querySelector('.timer')
shooter.$targets = shooter.$container.querySelector('.targets')
shooter.$bestScore = shooter.$container.querySelector('.best-score .value')
shooter.score = 0
shooter.secondsLeft = 0
shooter.bestScore = window.localStorage.getItem('bestScore')

if (shooter.$bestScore === null)
{
  shooter.bestScore = 0
}

shooter.bestScor = parseInt(shooter.bastScore)
shooter.$bestScore.textContent = shooter.bestScore

shooter.sounds = {}
shooter.sounds.ding = new Audio('audio/ding.mp3')
shooter.sounds.finish = new Audio('audio/finish.mp3')

shooter.$start.addEventListener('click', () =>
{
    shooter.start()
})

/**
 * Methods
 */
shooter.start = () =>
{
    shooter.$container.classList.remove('step-start')
    shooter.$container.classList.remove('step-end')
    shooter.$container.classList.add('step-game')

    shooter.secondsLeft = 12

    shooter.score = 0
    shooter.$score.textContent = shooter.score

    shooter.tick()
}

shooter.end = () =>
{
    shooter.$container.classList.remove('step-game')
    shooter.$container.classList.add('step-end')

    shooter.sounds.finish.play()

    if (shooter.score>shooter.bestScore)
    {
      window.localStorage.setItem('bestScore', shooter.score)
      shooter.bestScore = shooter.score
      shooter.$bestScore.textContent = shooter.score
    }
}

shooter.tick = () =>
{
    shooter.secondsLeft--

    if(shooter.secondsLeft === 0)
    {
        shooter.end()
    }
    else
    {
        if(shooter.secondsLeft < 10)
        {
            shooter.$timer.textContent = `00:0${shooter.secondsLeft}`
        }
        else
        {
            shooter.$timer.textContent = `00:${shooter.secondsLeft}`
        }

        window.setTimeout(shooter.tick, 1000)
    }
}

shooter.addTarget = () =>
{
    // Create target
    const $target = document.createElement('div')
    $target.classList.add('target')
    $target.style.top = `${Math.random() * 100}%`
    $target.style.left = `${Math.random() * 100}%`
    shooter.$targets.appendChild($target)

    // Listen to mouse enter
    $target.addEventListener('mouseenter', () =>
    {
        shooter.shootTarget($target)
    })
}

shooter.shootTarget = (_$target) =>
{
    // Delete target
    _$target.remove()

    // Add new target
    shooter.addTarget()

    // Increment score
    shooter.score++
    shooter.$score.textContent = shooter.score

    // Play sound
    shooter.sounds.ding.currentTime = 0
    shooter.sounds.ding.play()
}

shooter.addTarget()
