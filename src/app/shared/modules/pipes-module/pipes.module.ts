import { NgModule } from '@angular/core';
import { GetErrorMessagePipe } from './get-err-mess.pipe';
import { GetBookInfoPipe } from './get-book-info.pipe';

const pipes = [
  GetErrorMessagePipe,
  GetBookInfoPipe
]

@NgModule({
  declarations: [...pipes],
  imports: [],
  exports: [...pipes]
})
export class PipesModule {}
