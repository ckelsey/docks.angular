import { DocksModule } from './docks.module';

describe('DocksModule', () => {
  let docksModule: DocksModule;

  beforeEach(() => {
    docksModule = new DocksModule();
  });

  it('should create an instance', () => {
    expect(docksModule).toBeTruthy();
  });
});
