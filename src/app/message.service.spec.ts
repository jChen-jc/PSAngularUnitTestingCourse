import { MessageService } from "./message.service"

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    // init
  })

  it("should have no message to start", () => {
    service = new MessageService();

    expect(service.messages.length).toBe(0);
  })

  it("should add a message when add it called", () => {
    service = new MessageService();

    // act
    service.add('Display message');

    expect(service.messages.length).toBe(1);
  })

  it("should clear messages when clear it called", () => {
    service = new MessageService();

    service.add('Display message');

    // act
    service.clear();

    expect(service.messages.length).toBe(0);
  })
})