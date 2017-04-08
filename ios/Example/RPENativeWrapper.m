//
//  RPENativeWrapper.m
//  Example
//
//  Created by Tal Kol on 08/04/2017.
//

#import "RPENativeWrapper.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTScrollableProtocol.h>

@interface RPENativeWrapper()
@property (nonatomic) UIView<RCTScrollableProtocol> *scrollable;
@end

@implementation RPENativeWrapper

RCTBridge *_bridge;
RCTUIManager *_uiManager;

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
  RCTAssertParam(bridge);
  
  if ((self = [super initWithFrame:CGRectZero]))
  {
    _bridge = bridge;
    while ([_bridge respondsToSelector:NSSelectorFromString(@"parentBridge")]
           && [_bridge valueForKey:@"parentBridge"])
    {
      _bridge = [_bridge valueForKey:@"parentBridge"];
    }
    _uiManager = _bridge.uiManager;
  }
  
  return self;
}

- (void)dealloc
{
  if (self.scrollable)
  {
    [self.scrollable removeScrollListener:self];
    self.scrollable = nil;
  }
}

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)


- (void)setScrollViewHandle:(NSNumber *)scrollViewHandle
{
  _scrollViewHandle = scrollViewHandle;
  
  dispatch_async(RCTGetUIManagerQueue(), ^{
  
    [_bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry)
    {
      UIView *view = viewRegistry[scrollViewHandle];
      if ([view conformsToProtocol:@protocol(RCTScrollableProtocol)])
      {
        if (self.scrollable) return;
        self.scrollable = (UIView<RCTScrollableProtocol>*)view;
        [self.scrollable addScrollListener:self];
      }
      else
      {
        RCTLogError(@"scrollViewHandle view does not conform to RCTScrollableProtocol  %@ "
                    "with tag #%@", view, scrollViewHandle);
      }
   }];
    
  });

}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
  CGFloat scrollY = scrollView.contentOffset.y;
  if (scrollY >= 0)
  {
    CGFloat newOpacity = 1.0 - (scrollY / 250.0);
    if (newOpacity < 0) newOpacity = 0;
    self.alpha = newOpacity;
    self.transform = CGAffineTransformScale(CGAffineTransformIdentity, 1.0, 1.0);
  }
  else
  {
    CGFloat newScale = 1.0 + 0.4*(-scrollY / 200.0);
    if (newScale > 1.4) newScale = 1.4;
    self.alpha = 1.0;
    self.transform = CGAffineTransformScale(CGAffineTransformIdentity, newScale, newScale);
  }
}

@end
