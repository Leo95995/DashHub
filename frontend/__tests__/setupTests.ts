import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// fetch mock globale con tipi corretti
const mock = jest.fn() as jest.Mock;
global.fetch = mock as unknown as typeof fetch;
