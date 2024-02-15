QUnit.test('Test findposition', function (assert) {
    const debut = '00:00';
    const positionAttendue = 0; 
    const positionObtenue = findPosition(debut);
    assert.strictEqual(positionObtenue, positionAttendue, 'La position obtenue doit être égale à la position attendue.');

    const fin = '10:00';
    const positionAttendue2 = 40; 
    const positionObtenue2 = findPosition(fin);
    assert.strictEqual(positionObtenue2, positionAttendue2, 'La position obtenue doit être égale à la position attendue.');
  });