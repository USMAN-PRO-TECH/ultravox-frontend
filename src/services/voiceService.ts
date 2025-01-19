import { apiService } from './api';
import { VoiceListResponse } from '../types/voice';

const VOICE_LIST_URL = '/api/v1/voicelist';

class VoiceService {
  async getVoiceList() {
    return apiService.get<VoiceListResponse>(VOICE_LIST_URL + '/voices');
  }
}

export const voiceService = new VoiceService(); 